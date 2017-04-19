import {Observable, Subject} from '@reactivex/rxjs'

const intervalTime = process.env.CHECK_INTERVAL || 30000

/**
 * This one is to kill the requesting process
 * @type {Subject}
 */
const tearDown$ = new Subject()

/**
 * To generate a ticker to produce every `intervalTime`
 */
const tick$ = Observable
    .interval(intervalTime)
    .takeUntil(tearDown$)


export {
    tick$,
    tearDown$
}
