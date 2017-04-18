import R from 'ramda'
import {baseParse, eurLens, propAsPrice} from './util'

export default {

    url: 'http://api.coindesk.com/v1/bpi/currentprice.json',
    client: 'http',
    parser: R.compose(
        R.assoc('src', 'coindesk.com'),
        propAsPrice('rate_float'),
        R.pick(['rate_float']),
        R.view(eurLens),
        R.prop('bpi'),
        baseParse
    )
}
