const express = require('express')
const app = express()
const port = 3000
var indexRouter = require('./src/routes/index');
var companyRouter = require('./src/routes/company');
const logger = require('./src/utils/logger');
logger.info('initializing application');

app.use('/', indexRouter);
app.use('/companies', companyRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;