const User = require('../models/User');
const bcrypt = require('bcrypt');
const MailController = require('../middlewares/MailController');
const Token = require('../middlewares/Token');
const crypto = require('crypto');
const cloudinary = require('../middlewares/Cloudinary');
const formidable = require('formidable');

module.exports = {
    async index(req, res) {
        try {
            const users = await User.findAll();

            return res.json(users);
        } catch (error) {
            return res.json(error);
        }
    },
    async getThis(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.userEmail } });

            return res.json(user);
        } catch (error) {
            return res.json(error)
        }
    },
    async store(req, res) {
        try {
            const { avatar, name, email, pass } = req.body;

            const password = await bcrypt.hash(pass, 10);

            const user = await User.create({ avatar, name, email, password });

            // const mail = await MailController.storeMail(email);

            return res.json({ user: user })
        } catch (error) {
            console.log(error)
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

            return res.json(true);
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
    },
    async update(req, res) {
        try {
            const { avatar, name, email, new_pass } = req.body;

            const user = await User.findOne({ where: { email: req.userEmail } });

            if (!user) return res.status(404).send({ error: 'User not found' });

            let pass = undefined;

            if (new_pass != undefined) {
                pass = await bcrypt.hash(new_pass, 10);
            };

            let token = undefined;

            if (email != undefined) {
                token = Token.generateToken({ email: email });
            };

            await user.update({
                avatar: avatar,
                name: name,
                email: email,
                password: pass
            }, { where: { id: user.id } });

            return res.json({token: token});
        } catch (error) {
            return res.json(error);
        }
    },
    async uploadAvatar(req, res) {
        try {
            let form = new formidable.IncomingForm({
                // uploadDir: './src/views/upload',
                keepExtensions: true
            });

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return res.json(error);
                };

                const url = await cloudinary.uploader(files.avatar.path);

                return res.json(url);
            });
        } catch (error) {
            return res.json(error);
        }
    }
}