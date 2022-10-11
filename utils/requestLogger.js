const requestLogger = (req, res, next) => {
    console.log('/n ----incoming request----/n')
    console.log(`${new Date()}`)
    console.log(`${req.method} ${req.url}`)
    console.log(`body ${JSON.stringify(req.body)}`)
    console.log('/n ----end request----/n')
    next()
}

module.exports = requestLogger