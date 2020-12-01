const express = require('express');
const app = express();

const cors = require('cors');
app.use((req, res, next) => {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.use(express.json());

require('dotenv').config();

require('./database/index');

const routes = require('./router/routes.js');
app.use(routes);

console.log(process.env.TOKEN_SECRET)

let port = process.env.PORT || 3333;

app.listen(port, () => { console.log('Started!') });