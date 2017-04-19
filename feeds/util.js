import R from 'ramda'

const eurLens = R.lensProp('EUR')
const bidLens = R.lensProp('bid')

const propAsPrice = R.curry((prop, obj) => {

    const getProp = R.compose(R.defaultTo(0), R.prop(prop))
    return {
        price: getProp(obj)
    }
})

const sortByPrice = R.sortBy(R.prop('price'))
const packageTheResult = R.compose(
    R.head,
    R.reverse,
    sortByPrice
)

export {
    eurLens,
    bidLens,
    propAsPrice,
    packageTheResult
}
