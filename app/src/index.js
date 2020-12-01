const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

require('dotenv').config();

require('./database/index');

const routes = require('./router/routes.js');
app.use(routes);

console.log(process.env.TOKEN_SECRET)

let port = process.env.PORT || 3333;

app.listen(port, () => {console.log('Started!')});