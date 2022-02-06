require('./config');

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/client/routes');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(routes);

// In development
if (process.env.DEVELOPMENT === 'true') {
  console.log('Running in Development mode.');
  app.use(require('cors')());
  app.use(require('morgan')('dev'));
}

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Server started on port: ' + server.address().port);
});
