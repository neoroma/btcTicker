import {Router} from 'express'
import {tearDown$} from '../ticker'

const router = Router()

router.get('/stop', function (req, res, next) {
    tearDown$.next()
    res.status(200).send('ticker stopped, no more emits')
})

export {router}
