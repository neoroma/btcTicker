import {Observable, Subject} from '@reactivex/rxjs'

const tearDown$ = new Subject()
const tick$ = Observable
    .interval(10000)
    .takeUntil(tearDown$)


export {
    tick$,
    tearDown$
}
