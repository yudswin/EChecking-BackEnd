const LecturerRouter = require('./LecturerRouter')

const routes = (app) => {
    app.use('/api/lecturer', LecturerRouter)
    
}

module.exports = routes