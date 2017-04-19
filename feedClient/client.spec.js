/* global describe, it */

import {Observable} from '@reactivex/rxjs'
import {expect} from 'chai'
import {observableFromFeed} from './client'
import fetchMock from 'fetch-mock'


describe('feed client', () => {

    it('should hit /feed and return default object', (done) => {

        const expected = {price: 0, status: 'red', url: '/feed'}

        observableFromFeed({
            url: '/feed',
            parser: () => []
        })
            .subscribe(result => {

                expect(result)
                    .that.is.an('object')
                    .that.deep.equals(expected)

                done()
            })


    })

    describe('mocking fetch', () => {
        it('should successfully hit the url ... ', (done) => {

            const fMock = fetchMock.sandbox().mock('/feed', 200)

            observableFromFeed({
                url: '/feed',
                parser: () => []
            }, fMock)
                .subscribe(() => {

                    expect(fMock.called('/feed')).to.be.true
                    done()
                })


        })

        describe('making more feeds', () => {

            const empty = JSON.stringify({})

            const fMock = fetchMock.sandbox()
                .mock('/feed1', empty)
                .mock('/feed2', empty)
                .mock('/feed3', empty)

            const feed1 = observableFromFeed({
                url: '/feed1',
                parser: () => []
            }, fMock)

            const feed2 = observableFromFeed({
                url: '/feed2',
                parser: () => []
            }, fMock)

            const feed3 = observableFromFeed({
                url: '/feed3',
                parser: () => []
            }, fMock)

            const feeds = [feed1, feed2, feed3]

            it('should hit all 3 feed urls in parallel', (done) => {
                Observable.merge(...feeds)
                    .bufferCount(feeds.length)
                    .subscribe(() => {

                        expect(fMock.called('/feed1')).to.be.true
                        expect(fMock.called('/feed2')).to.be.true
                        expect(fMock.called('/feed3')).to.be.true

                        done()
                    })
            })


        })
    })

})
