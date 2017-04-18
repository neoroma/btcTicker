import R from 'ramda'
import {baseParse, eurLens, propAsPrice} from './util'

export default {

    url: 'https://blockchain.info/ticker',
    client: 'https',
    parser: R.compose(
        R.assoc('src', 'blockchain.info'),
        propAsPrice('last'),
        R.pick(['last']),
        R.view(eurLens),
        baseParse
    )
}
