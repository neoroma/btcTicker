/* global describe, it */

import {expect} from 'chai'
import markets from '../../data/markets.json'
import emptyMarkets from '../../data/empty-markets.json'
import marketsWithoutEur from '../../data/no-eur-markets.json'
import marketsWithoutBidProperty from '../../data/no-bid-prop-markets.json'
import marketsWhereBidPropString from '../../data/bid-wrong-type-markets.json'

import bitcoinchartsFeed from './bitcoincharts.feed'

describe('bitcoincharts feed', () => {

    const {parser} = bitcoinchartsFeed

    describe('parser', () => {
        it('should parse the input json and return expected object', () => {

            const result = parser(markets)
            const expectedObj = {price: 10000, src: 'bitcoincharts.com'}

            expect(result)
                .that.is.an('object')
                .that.deep.equals(expectedObj)
        })

        describe('parsing bad data', () => {
            it('should handle empty data and return expected object with price 0', () => {

                const result = parser(emptyMarkets)
                const expectedObj = {price: 0, src: 'bitcoincharts.com'}

                expect(result)
                    .that.is.an('object')
                    .that.deep.equals(expectedObj)
            })

            it('should handle data with no eur entries and return expected object with price 0', () => {

                const result = parser(marketsWithoutEur)
                const expectedObj = {price: 0, src: 'bitcoincharts.com'}

                expect(result)
                    .that.is.an('object')
                    .that.deep.equals(expectedObj)
            })

            it('should handle data with bid prop renamed and return expected object with price 0', () => {

                const result = parser(marketsWithoutBidProperty)
                const expectedObj = {price: 0, src: 'bitcoincharts.com'}

                expect(result)
                    .that.is.an('object')
                    .that.deep.equals(expectedObj)
            })

            it('should handle data with bid prop value is string and return an object', () => {

                const result = parser(marketsWhereBidPropString)

                expect(result)
                    .that.is.an('object')
                    .to.have.ownProperty('price')
                    .to.have.ownProperty('src')
            })
        })
    })
})
