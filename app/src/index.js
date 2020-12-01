const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());

var whitelist = ['https://poetize.netlify.app', 'http://localhost:3333']
app.use(cors({
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}))

require('dotenv').config();

require('./database/index');

const routes = require('./router/routes.js');
app.use(routes);

let port = process.env.PORT || 3333;

app.listen(port, () => { console.log('Started!') });