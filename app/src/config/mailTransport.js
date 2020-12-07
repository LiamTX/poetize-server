const nodemailer = require('nodemailer');
const smtpConfig = require('./smtp');


//Configuração do "transportador" que ira enviar os e-mails
const transport = nodemailer.createTransport({
    // host: smtpConfig.host,
    service: 'Gmail',
    port: smtpConfig.port,
    secure: true,
    auth: {
        user: smtpConfig.user,
        pass: smtpConfig.password
    },
    tls: {
        rejectUnauthorized: false
    }
});




module.exports = transport;