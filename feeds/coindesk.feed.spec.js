/* global describe, it */

import {expect} from 'chai'
import data from '../data/coindesk.json'
import coindeskFeed from './coindesk.feed'

describe('coindesk feed', () => {

    const {parser} = coindeskFeed

    describe('parser', () => {
        it('should parse the input json and return expected object', () => {

            const result = parser(data)
            const expectedObj = {price: 1143.1901, src: 'coindesk.com'}

            expect(result)
                .that.is.an('object')
                .that.deep.equals(expectedObj)
        })
    })
})
