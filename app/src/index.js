const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());

require('dotenv').config();

require('./database/index');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    app.use(cors());
    next();
});

const routes = require('./router/routes.js');
app.use(routes);

let port = process.env.PORT || 3333;

app.listen(port, () => { console.log('Started!') });