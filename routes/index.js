import {Router} from 'express'
import R from 'ramda'
import https from 'https'
import http from 'http'
import RxNode from 'rx-node'
import {Observable} from '@reactivex/rxjs'

const router = Router()

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'})
})

router.get('/btc', function (req, response, next) {

    const baseParse = R.compose(
        JSON.parse,
        R.reduce(R.concat, ''),
        R.map(R.toString))

    const parseRate = R.compose(
        R.pick(['USD', 'EUR']),
        baseParse
    )

    const parseCoindesk = R.compose(
        R.pick(['USD', 'EUR']),
        R.prop('bpi'),
        baseParse
    )

    const parseBitcoinchart = R.compose(
        baseParse
    )

    const blockchain$ = observableFromRequest('https', 'https://blockchain.info/ticker', parseRate)
    const coindesk$ = observableFromRequest('http', 'http://api.coindesk.com/v1/bpi/currentprice.json', parseCoindesk)
    const bitcoinchart$ = observableFromRequest('http', 'http://api.bitcoincharts.com/v1/markets.json', parseBitcoinchart)

    const pool = [blockchain$, coindesk$, bitcoinchart$]

    Observable.merge(...pool)
        .bufferCount(pool.length)
        .subscribe(
            data => {
                response.json(data)
            }, ({code}) => {
                response.status(500).send(code)
            })

})

function observableFromRequest (protocol = 'http', feedUrl, parser) {

    return Observable.create(subscriber => {

        const client = protocol === 'http' ? http : https

        client.get(feedUrl, (res) => {

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
