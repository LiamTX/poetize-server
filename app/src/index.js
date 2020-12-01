const express = require('express');
const app = express();

const cors = require('cors');
const corsOptions = {
    origin: 'https://poetize.netlify.app',
    optionsSuccessStatus: 200
}

app.use(express.json());
// app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://poetize.netlify.app")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    app.use(cors());
    next();
})

// app.use((req, res, next) => {
//     app.use(cors());
//     next();
// });

require('dotenv').config();

require('./database/index');

const routes = require('./router/routes.js');
app.use(routes);

let port = process.env.PORT || 3333;

app.listen(port, () => { console.log('Started!') });