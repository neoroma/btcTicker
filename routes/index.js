import {Router} from 'express'
import {Observable} from '@reactivex/rxjs'
import fetch from 'node-fetch'

import {packageTheResult} from '../feeds/util'

import blockchainFeed from '../feeds/blockchain/blockchain.feed'
import bitcoinchartsFeed from '../feeds/bitcoincharts/bitcoincharts.feed'
import coindeskFeed from '../feeds/coindesk/coindesk.feed'

const router = Router()

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'})
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

function observableFromFeed ({url, parser}) {

    const errorObject = {
        price: 0,
        status: 'red',
        url
    }

    return Observable
        .fromPromise(
            fetch(url)
                .then(res => res.json())
        )
        .map(parser)
        .catch(err => Observable.of(errorObject))
}

export {router}
