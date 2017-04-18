import R from 'ramda'
import {baseParse, bidLens, propAsPrice} from './util'

export default {

    url: 'http://api.bitcoincharts.com/v1/markets.json',
    client: 'http',
    parser: R.compose(
        R.assoc('src', 'bitcoincharts.com'),
        R.objOf('price'),
        R.reduce(R.max, 0),
        R.map(R.view(bidLens)),
        R.filter(R.propEq('currency', 'EUR')),
        baseParse
    )
}

