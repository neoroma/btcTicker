/* global describe, it */

import {expect} from 'chai'
import markets from '../../data/markets.json'
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
    })
})
