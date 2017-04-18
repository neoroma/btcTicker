import {Router} from 'express'
import R from 'ramda'
import https from 'https'
import http from 'http'
import RxNode from 'rx-node'
import {Observable} from '@reactivex/rxjs'

const router = Router()

const eurLens = R.lensProp('EUR')
const bidLens = R.lensProp('bid')

const propAsPrice = R.curry((prop, obj) => {
    return {
        price: R.prop(prop, obj)
    }
})

const sortByPrice = R.sortBy(R.prop('price'))
const packageTheResult = R.compose(
    R.head,
    R.reverse,
    sortByPrice
)

const baseParse = R.compose(
    JSON.parse,
    R.reduce(R.concat, ''),
    R.map(R.toString))

const parseRate = R.compose(
    R.assoc('src', 'blockchain.info'),
    propAsPrice('last'),
    R.pick(['last']),
    R.view(eurLens),
    baseParse
)

const parseCoindesk = R.compose(
    R.assoc('src', 'coindesk.com'),
    propAsPrice('rate_float'),
    R.pick(['rate_float']),
    R.view(eurLens),
    R.prop('bpi'),
    baseParse
)

const parseBitcoinchart = R.compose(
    R.assoc('src', 'bitcoincharts.com'),
    R.objOf('price'),
    R.reduce(R.max, 0),
    R.map(R.view(bidLens)),
    R.filter(R.propEq('currency', 'EUR')),
    baseParse
)

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'})
})

router.get('/btc', function (req, response, next) {

    const blockchain$ = observableFromRequest('https', 'https://blockchain.info/ticker', parseRate)
    const coindesk$ = observableFromRequest('http', 'http://api.coindesk.com/v1/bpi/currentprice.json', parseCoindesk)
    const bitcoinchart$ = observableFromRequest('http', 'http://api.bitcoincharts.com/v1/markets.json', parseBitcoinchart)

    const feeds = [blockchain$, coindesk$, bitcoinchart$]

    Observable.merge(...feeds)
        .bufferCount(feeds.length)
        .subscribe(
            data => {
                const maxPrice = packageTheResult(data)
                response.json({
                    'winner': maxPrice,
                    'raw': data,
                    'sources': feeds.length
                })
            }, ({code}) => {
                response.status(500).send(code)
            })

})

function observableFromRequest (protocol = 'http', feedUrl, parser) {

    return Observable.create(subscriber => {

        const client = protocol === 'http' ? http : https

        client.get(feedUrl, (res) => {

            const {statusCode} = res

            if (statusCode !== 200) {
                subscriber.next({
                    price: 0,
                    status: 'red'
                })
                subscriber.complete()

                return
            }

            RxNode.fromStream(res)
                .bufferCount(100)
                .subscribe(buffers => {
                    subscriber.next(parser(buffers))
                    subscriber.complete()
                })

        }).on('error', err => {
            subscriber.error(err)
        })

        return () => {
        }
    })
}

export {router}
