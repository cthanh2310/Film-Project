const homeRouter = require('./home');
const loginRouter = require('./login');
const registerRouter = require('./register.js');
const filmRouter = require('./film.js');
const createRouter = require('./create.js');
const searchRouter = require('./search.js');
const updateRouter = require('./update.js');
const deleteRouter = require('./delete.js');

const filmMiddlewareController = require('../app/controllers/FilmMiddlewareController');
const CRUDMiddlewareController = require('../app/controllers/CRUDMiddlewareController');
function route(app){
    app.use('/login',loginRouter);

    app.use('/register', registerRouter);

    app.use('/film', filmMiddlewareController.requireAuthentication, filmRouter);

    app.use('/create', CRUDMiddlewareController.requireAuthentication, createRouter);

    app.use('/update', CRUDMiddlewareController.requireAuthentication, updateRouter);

    app.use('/delete', CRUDMiddlewareController.requireAuthentication, deleteRouter);

    app.use('/search', filmMiddlewareController.requireAuthentication, searchRouter);


    app.use('/', homeRouter);   

}

module.exports = route;
