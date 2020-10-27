const User = require('../models/User');
const bcrypt = require('bcrypt');
const MailController = require('../middlewares/MailController/MailController');
const Token = require('../middlewares/Token');
const crypto = require('crypto');

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll();

            return res.json(users);
        } catch (error) {
            return res.json(error);
        }
    },
    async store(req, res) {
        try {
            const { name, email, pass } = req.body;
            const password = await bcrypt.hash(pass, 10);

            const user = await User.create({ name, email, password });

            const mail = await MailController.storeMail(email);

            return res.json({ mail: mail, user: user })
        } catch (error) {
            return res.json(error);
        }
    },
    async auth(req, res) {
        try {
            const { email, pass } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) {
                return res.status(404).send({ error: 'User not found!' });
            };

            if (!await bcrypt.compare(pass, user.password)) {
                return res.status(401).send({ error: 'Unauthorized' });
            }

            return res.json({ token: Token.generateToken({ email: user.email }) });
        } catch (error) {
            return res.json(error);
        }
    },
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) return res.status(404).send({ error: 'User not found!' });

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.update({
                password_reset_token: token,
                password_reset_expires: now
            }, { where: { id: user.id } });

            const mail = await MailController.forgotPassMail(email, token);

            console.log(token, now, mail)
        } catch (error) {
            return res.json(error);
        }
    },
    async resetPassword(req, res) {
        try {
            const { email, token, new_password } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (!user) return res.status(404).send({ error: 'User not found!' });

            if (token != user.password_reset_token) return res.status(404).send({ error: 'Token invalid!' });

            const now = new Date();

            if (now > user.password_reset_expires) return res.status(404).send({ error: 'Token expired!' });

            const hash = await bcrypt.hash(new_password, 10);

            await user.update({
                password: hash
            }, { where: { id: user.id } });

            return res.send();
        } catch (error) {
            return res.json(error);
        }
    }
}