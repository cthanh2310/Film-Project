
const homeRouter = require('./home');
const loginRouter = require('./login');
const registerRouter = require('./register.js');
const filmRouter = require('./film.js');
const updateRouter = require('./update.js');
const searchRouter = require('./search.js');


const filmMiddlewareController = require('../app/controllers/FilmMiddlewareController');
const updateMiddlewareController = require('../app/controllers/UpdateMiddlewareController');
function route(app){
    app.use('/login',loginRouter);

    app.use('/register', registerRouter);

    app.use('/film', filmMiddlewareController.requireAuthentication, filmRouter);

    app.use('/update', updateMiddlewareController.requireAuthentication, updateRouter);

    app.use('/search', filmMiddlewareController.requireAuthentication, searchRouter);

    app.use('/', homeRouter);   

}

module.exports = route;
