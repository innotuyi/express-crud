const home =require('./routes/home')
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const dbpDebugger = require('debug')('app:db')
const morgan = require('morgan')
const helmet = require('helmet')
const logger =require('./middleware/logger.js')
const genre = require('./routes/genre')
const authicate = require('./authentication')
const express = require("express");
const app = express();
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
 
app.set('view engine', 'pug');
app.set('views', './views')
app.use(express.json());
app.use(helmet());
app.use('/', home);
app.use('api/courses',genre)

if(app.get('env') == 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enable');

}

app.use(express.static('public'))
app.use(express.urlencoded ({extendend:true}));
app.use(logger);
app.use(authicate)
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
