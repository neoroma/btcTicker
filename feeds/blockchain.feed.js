import R from 'ramda'
import {eurLens, propAsPrice} from './util'

export default {

    url: 'https://blockchain.info/ticker',
    parser: R.compose(
        R.assoc('src', 'blockchain.info'),
        propAsPrice('last'),
        R.pick(['last']),
        R.view(eurLens)
    )
}
