const express = require('express');
const app = express();
const routes = require('./router/routes.js');

const cors = require('cors');
app.use(cors());

require('dotenv').config();

require('./database/index');

app.use(express.json());
app.use(routes);

let port = process.env.PORT || 3333;

app.listen(port, () => console.log('Started!'));