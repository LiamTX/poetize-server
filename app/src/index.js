const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());

// app.use(cors());

app.use(cors({
    origin: true,
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

require('dotenv').config();

require('./database/index');

const routes = require('./router/routes.js');
app.use(routes);

let port = process.env.PORT || 3333;

app.listen(port, () => { console.log('Started!') });