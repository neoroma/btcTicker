/* global describe, it */

import {expect} from 'chai'
import data from '../../data/blockchain.json'
import blockchainFeed from './blockchain.feed'

describe('blockchain feed', () => {

    const {parser} = blockchainFeed

    describe('parser', () => {
        it('should parse the input json and return expected object', () => {

            const result = parser(data)
            const expectedObj = {price: 1187.98, src: 'blockchain.info'}

            expect(result)
                .that.is.an('object')
                .that.deep.equals(expectedObj)
        })
    })
})
