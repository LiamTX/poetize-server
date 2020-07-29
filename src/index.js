const express = require('express');
const app = express();

app.use(express.json());

const routes = require('./router/routes');
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log('Started!'));