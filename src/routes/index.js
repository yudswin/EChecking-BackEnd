const LecturerRouter = require('./LecturerRouter')

const routes = (app) => {
    app.use('/api/user', LecturerRouter)
}

module.exports = routes