/* global describe, it */

import {expect} from 'chai'
import data from '../../data/blockchain.json'
import dataWithoutEur from '../../data/blockchain-no-eur.json'
import dataWithoutLastProp from '../../data/blockchain-no-last-prop.json'
import dataWithLastIsString from '../../data/blockchain-last-is-string.json'
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

        describe('parsing bad data', () => {
            it('should parse the input json without EUR key and return expected object', () => {

                const result = parser(dataWithoutEur)
                const expectedObj = {price: 0, src: 'blockchain.info'}

                expect(result)
                    .that.is.an('object')
                    .that.deep.equals(expectedObj)
            })

            it('should parse the input json the last prop and return expected object', () => {

                const result = parser(dataWithoutLastProp)
                const expectedObj = {price: 0, src: 'blockchain.info'}

                expect(result)
                    .that.is.an('object')
                    .that.deep.equals(expectedObj)
            })

            it('should handle data where last prop is string and return expected object', () => {

                const result = parser(dataWithLastIsString)
                const expectedObj = {price: "1803.19", src: 'blockchain.info'}

                expect(result)
                    .that.is.an('object')
                    .that.deep.equals(expectedObj)
            })
        })

    })
})
