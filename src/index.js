const express = require('express');
const app = express();

app.use(express.json());

const routes = require('./router/routes');
app.use(routes);

app.listen(3333, () => console.log('Started!'));