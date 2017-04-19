import {Observable} from '@reactivex/rxjs'
import fetch from 'node-fetch'

export const observableFromFeed = ({url, parser}) => {

    const errorObject = {
        price: 0,
        status: 'red',
        url
    }

    return Observable
        .fromPromise(
            fetch(url)
                .then(res => res.json())
        )
        .do(() => {
            /**
             * Feel free to log some responses
             */
        })
        .map(parser)
        .retry(3)
        .catch(err => Observable.of(errorObject))
}
