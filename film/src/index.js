const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes/index');
const handlebars = require('express-handlebars');

const bcrypt = require('bcrypt');

const db = require('./config/db');
db.connect();

// const morgan = require('morgan')
app.use(express.static(path.join(__dirname, 'public')));  //static file: use in template engine 
app.use(
    express.urlencoded({
        extended: true, // delete bug
    }),
);
app.use(express.json());
// XMLHTTP request, fetch, axios, ajax of jquery -->send database to server
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs', // rename handlebars --> hbs
    }),
); //define handlebars == handllebars function
app.set('view engine', 'hbs'); // Set view engine = handlebars
app.set('views', path.join(__dirname, 'resource', 'views'));

route(app);

//local host: 127.0.0.1
app.listen(port, () => {
    // port = 3000
    console.log(`App listening at http://localhost:${port} `);
});
