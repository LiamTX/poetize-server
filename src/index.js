const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

require('./database/index');

app.use(express.json());

const routes = require('./router/routes.js');
app.use(routes);

let port = 3333 || process.env.PORT;

app.listen(port, () => console.log('Started!'));