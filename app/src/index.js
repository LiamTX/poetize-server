const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

require('dotenv').config();

require('./database/index');

const routes = require('./router/routes.js');
app.use(express.json());
app.use(routes);

// console.log(process.env.DB_DATABASE)

let port = process.env.PORT || 3333;

app.listen(port, () => {console.log('Started!')});