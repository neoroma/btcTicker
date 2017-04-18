import R from 'ramda'

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
    R.map(R.toString)
)

export {
    eurLens,
    bidLens,
    propAsPrice,
    baseParse,
    packageTheResult
}
