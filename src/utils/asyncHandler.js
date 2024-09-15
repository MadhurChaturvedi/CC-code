const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // Promise.resolve(requestHandler(req, res, next))
        //     .catch((err) => next(err))
        try {
            requestHandler(req, res, next)
        } catch (error) {
            next(err)
        }
    }
}
export { asyncHandler }