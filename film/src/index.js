const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes/index');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session');

// const redis = require('redis')
// const redisClient = redis.createClient()
// const redisStore = require('connect-redis')(session);
// redisClient.on('error', (err) => {
//     console.log('Redis error: ' + err);
// });

// const initializePassport = require('./config/passport-config');

// initializePassport(passport);
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         secure: false,
//         maxAge: 15000,
//     }, // Đường truyền là https nếu secure = true : bảo mật
//     // store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
// }))
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
// app.get('/demo', function (req, res, next) {
//     if (req.session.views) {
//         req.session.views++;
//         res.setHeader('Content-Type', 'text/html')
//         res.write('<p>views: ' + req.session.views + '</p>')
//         res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//         res.end()
//     } else {
//         req.session.views = 1
//         res.end('welcome to the session demo. refresh!')
//     }
// })
app.use(cookieParser());
app.use(express.json());
// XMLHTTP request, fetch, axios, ajax of jquery -->send database to server
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs', // rename handlebars --> hbs
        helpers: {
            times: function(n, block) {
                var accum = '';
                for(var i = 1; i <= n; ++i)
                    accum += block.fn(i);
                return accum;
            },
        }
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
