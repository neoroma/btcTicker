import {Subject} from '@reactivex/rxjs'
import {packageTheResult} from '../feeds/util'

/**
 * Let's make a socket connection handler
 * After someone connects to the socket, we will subscribe to the data shared
 * data stream. It will also unsubscribe from the stream after disconnecting.
 * As our stream is counting refs, it will not emit values without any subscribers
 * @param stream$, to have some data stream to use
 * @returns {function(*)} handler for the connection
 */
export const onConnection = function (stream$) {

    return (socket) => {

        const shutDown$ = new Subject()

        socket.broadcast.emit('init', 'another, sub online')
        socket.emit('init', 'another, sub online')

        stream$
            .takeUntil(shutDown$)
            .subscribe(data => {

                const maxPrice = packageTheResult(data)
                socket.emit('news', {
                    'winner': maxPrice,
                    'raw': data
                })

            })

        socket.on('disconnect', () => {
            shutDown$.next()
            socket.broadcast.emit('init', 'sub left')
        })
    }

}
