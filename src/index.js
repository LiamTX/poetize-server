const express = require('express');
const app = express();

require('./database/index');

const cors = require('cors');

app.use(cors());
app.use(express.json());

const routes = require('./router/routes');
app.use(routes);

app.listen(3333, () => console.log('Started!'));