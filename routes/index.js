import {Router} from 'express'
import https from 'https'
import http from 'http'
import RxNode from 'rx-node'
import {Observable} from '@reactivex/rxjs'

import {packageTheResult} from '../feeds/util'
import blockchainFeed from '../feeds/blockchain.feed'
import bitcoinchartsFeed from '../feeds/bitcoincharts.feed'
import coindeskFeed from '../feeds/coindesk.feed'

const router = Router()

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'})
})

router.get('/btc', function (req, response, next) {

    const blockchain$ = observableFromRequest(blockchainFeed)
    const coindesk$ = observableFromRequest(coindeskFeed)
    const bitcoinchart$ = observableFromRequest(bitcoinchartsFeed)

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

function observableFromRequest ({client: protocol, url, parser}) {

    return Observable.create(subscriber => {

        const client = protocol === 'http' ? http : https

        client.get(url, (res) => {

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
