import {Observable, Subject} from '@reactivex/rxjs'

const intervalTime = process.env.CHECK_INTERVAL || 30000

const tearDown$ = new Subject()
const tick$ = Observable
    .interval(intervalTime)
    .takeUntil(tearDown$)


export {
    tick$,
    tearDown$
}
