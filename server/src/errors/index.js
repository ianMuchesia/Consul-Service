const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')
const CustomApiError = require('./custom-error')
const ForbiddenError = require('./forbidden')




module.exports = {
    NotFoundError,
    BadRequestError,
    UnauthenticatedError,
    CustomApiError,
    ForbiddenError
}