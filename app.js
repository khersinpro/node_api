const express                     = require('express');
const createError                 = require('http-errors');
const cookieParser                = require('cookie-parser');
const logger                      = require('morgan');
const path                        = require('path');
const app                         = express();
const database                    = require('./database/index');
const router                      = require('./routes');
const { extractUserFromToken }    = require('./middleware/auth/auth');  

// Setting view engines
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => { 
    //*** Website you wish to allow to connect API, '*'= all websites allowed ***/
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //*** Access-Control-Request-Headers indicate which HTTP headers can be used during the actual request ***/
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // //*** Access-Control-Allow-Methods indicate which methods can be used during the actual request ***/
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // //*** Fix helmet error => net::ERR_BLOCKED_BY_RESPONSE.NotSameOrigin : https://github.com/helmetjs/helmet/issues/176 ***/
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
// Setting middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Router
app.use('/api', extractUserFromToken, router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500).json(req.app.get('env') === 'development' ? err.message : 'Une erreur est survenue!');
});

database.sequelize.authenticate()
.then(() => console.log('Connexion réussi'))
.catch((err) => console.error(err))


module.exports = app;