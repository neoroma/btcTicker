import {Router} from 'express'
import {Observable} from '@reactivex/rxjs'
import {tick$, tearDown$} from '../ticker'
import {observableFromFeed} from '../feedClient/client'

import {packageTheResult} from '../feeds/util'

import blockchainFeed from '../feeds/blockchain/blockchain.feed'
import bitcoinchartsFeed from '../feeds/bitcoincharts/bitcoincharts.feed'
import coindeskFeed from '../feeds/coindesk/coindesk.feed'

const router = Router()

router.get('/tick', function (req, res, next) {
    tick$.subscribe(val => console.log('Next tick: ', val))
    res.status(200).send('ticker started')
})

router.get('/stop', function (req, res, next) {
    tearDown$.next()
    res.status(200).send('ticker stopped')
})

router.get('/btc', function (req, response, next) {

    const blockchain$ = observableFromFeed(blockchainFeed)
    const coindesk$ = observableFromFeed(coindeskFeed)
    const bitcoinchart$ = observableFromFeed(bitcoinchartsFeed)

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

export {router}
