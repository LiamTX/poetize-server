const express = require('express');
const app = express();

require('dotenv').config();

require('./database/index');

const cors = require('cors');

app.use(cors());
app.use(express.json());

const routes = require('./router/routes');
app.use(routes);

let port = 3333 || process.env.PORT;

app.listen(port, () => console.log('Started!'));