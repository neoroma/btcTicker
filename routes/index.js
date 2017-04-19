import {Router} from 'express'
import {tearDown$} from '../ticker'

const router = Router()

/**
 * Just to show that's its possible to tear down all requests
 * from one place, just calling tearDown$.next()
 * could be also added to handle some socket event to kill all
 */
router.get('/stop', function (req, res, next) {
    tearDown$.next()
    res.status(200).send('ticker stopped, no more emits')
})

export {router}
