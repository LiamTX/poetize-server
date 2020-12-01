const transportConfig = require('../config/mailTransport');
const hbs = require('nodemailer-express-handlebars');
const exphs = require('express-handlebars');
const path = require('path');
const { resolve } = require('path');

const viewPath = path.resolve(__dirname, '../', 'views', 'Mail');

transportConfig.use('compile', hbs({
    viewEngine: exphs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
    }),
    viewPath,
    extName: '.hbs'
}));

//Controller dos envios de e-mail
module.exports = {
    async storeMail(to) {
        try {
            const mailOptions = {
                from: 'Poetize <poetizeando@gmail.com>',
                to: to,
                subject: 'Confirmação de e-mail',
                html: testTeamplateEmail
            };

            const mail = await transportConfig.sendMail(mailOptions);

            return mail;

        } catch (error) {
            return error;
        }
    },
    async forgotPassMail(to, token) {
        try {
            const mailOptions = {
                from: 'Poetize <poetizeando@gmail.com>',
                to: to,
                subject: 'Confirmação de e-mail',
                template: 'forgot_password',
                context: { token }
            };

            const mail = await transportConfig.sendMail(mailOptions);

            return mail;
        } catch (error) {
            return error;
        }
    }
}