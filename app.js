var express = require('express')
var path = require('path')
var session = require('express-session')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)
var _ = require('underscore')
var bodyParser = require('body-parser')
var dbUrl = 'mongodb://localhost:27017/haozhide'
var port = process.env.PORT || 3000
var app = express()

mongoose.connect(dbUrl)

app.set('views','./app/views/pages')

// app.set('view engine', 'jade')
app.engine('.html', require('ejs').__express);  
app.set('view engine', 'html');

app.use(bodyParser.urlencoded())

app.use(session({
    secret: 'haozhide',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('node saart on port' + port)

require('./config/routes')(app)