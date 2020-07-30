const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const routes = require('./router/routes');
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => console.log('Started!'));