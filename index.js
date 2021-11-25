const path = require('path').
    methods = require('methods'),
    express = require('express'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');
require('dotenv').config({ path: './src/config/config.env' });
const port = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === 'production'

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/src'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
    app.use(errorhandler());
} else {
    mongoose.set('debug', true);
}

require('./src/models/user.model');
// require('./models/Article');
// require('./models/Comment');
require('./src/config/passport');

app.use(require('./src/routes'));
/*
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
*/
if (!isProduction) {
    app.use((err, req, res, next) => {
        console.log(err.stack);
        res.status(err.status || 500);
        res.json({'errors': {
            message: err.message,
            error: err
        }});
    });
}

const dbo = require('./src/config/conn');
const Role = dbo.role;

app.listen(port, () => {
    dbo.connectToServer((e) => {
        if (e)
            console.error(e);
    });
    console.log(`Server is running on port: ${port}`);
});
