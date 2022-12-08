import AuthError from '../exceptions/auth.exceptions.js'

export default function (err, req, res, next) {
    console.log(err)

    if (err instanceof AuthError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }
    next()
    return res.status(500).json({ message: 'Unexpected error' })
}
