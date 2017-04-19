import R from 'ramda'
import {bidLens} from '../util'

export default {

    url: 'http://api.bitcoincharts.com/v1/markets.json',
    parser: R.compose(
        R.assoc('src', 'bitcoincharts.com'),
        R.objOf('price'),
        R.reduce(R.max, 0),
        // we could add some string parsing to number or smth if needed here
        R.map(R.view(bidLens)),
        R.filter(R.propEq('currency', 'EUR'))
    )
}

