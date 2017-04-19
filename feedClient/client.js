import {Observable} from '@reactivex/rxjs'
import fetch from 'node-fetch'

/**
 * Making an observable from request promise for a feed
 * In case of an error getting data from the feed, sample errorObject will be returned
 * But we could just pass the error to handle it down the pipe
 * @param url of the feed
 * @param parser, a function to deal with incoming data
 * @param fetcher to pass a mock for example, have a default value
 * @returns an Observable (next and complete at the same time)
 */
export const observableFromFeed = ({url, parser}, fetcher = fetch) => {

    const errorObject = {
        price: 0,
        status: 'red',
        url
    }

    return Observable
        .fromPromise(
            fetcher(url)
                .then(res => res.json())
        )
        .do(() => {
            /**
             * Feel free to log some responses
             */
        })
        .map(parser)
        .retry(3)
        .catch(() => Observable.of(errorObject))
}
