const express = require('express');
const app = express();

app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;


app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/auth', require('./controllers/auth'));
app.use(require('cookie-parser')());
