/* global describe, it, Buffer, beforeEach */

import {expect} from 'chai'
import {propAsPrice, packageTheResult} from './util'
import {raw} from '../data/all-data.json'

describe('utils', () => {

    describe('packageTheResult', () => {
        it('should return an object with a highest price', () => {

            const expectedObj = {
                price: 10000,
                src: 'bitcoincharts.com'
            }

            expect(packageTheResult(raw))
                .that.is.an('object')
                .that.deep.equals(expectedObj)

        })
    })

    describe('propAsPrice', () => {

        it('should copy rate_float prop to price prop', () => {

            const objToTest = {
                'rate_float': 1111.9999
            }

            const expectedObj = {
                price: 1111.9999
            }

            expect(propAsPrice('rate_float')(objToTest))
                .that.is.an('object')
                .that.deep.equals(expectedObj)
        })

        it('should copy last prop to price prop', () => {

            const objToTest = {
                'last': 1111.1111
            }

            const expectedObj = {
                price: 1111.1111
            }

            expect(propAsPrice('last')(objToTest))
                .that.is.an('object')
                .that.deep.equals(expectedObj)
        })

        it('should handle absent prop', () => {

            const objToTest = {
                'zzzz': 1111.9999
            }

            const expectedObj = {
                price: 0
            }

            expect(propAsPrice('rate_float')(objToTest))
                .that.is.an('object')
                .that.deep.equals(expectedObj)
        })
    })
})
