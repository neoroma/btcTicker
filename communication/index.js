import {Subject} from '@reactivex/rxjs'
import {packageTheResult} from '../feeds/util'

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
