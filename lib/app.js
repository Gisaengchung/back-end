const express = require('express');
const app = express();

app.use(require('cors')({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(require('cookie-parser')());

app.use('/api/v1/auth', require('./controllers/auth'));

app.use('/api/v1/user', require('./controllers/user'));

app.use('/api/v1/state', require('./controllers/state'));

app.use('/api/v1/genre', require('./controllers/genre'));

app.use('/api/v1/project', require('./controllers/project'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
