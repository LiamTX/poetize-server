const Poem = require('../models/Poem');
const User = require('../models/User');
const Like = require('../models/Likes');

module.exports = {
    async index(req, res) {
        const poems = await Poem.findAll();

        for (let i = 0; i < poems.length; i++) {
            let user = await User.findByPk(poems[i].user_id);

            user.password = undefined;
            user.password_reset_expires = undefined;
            user.password_reset_token = undefined;
            user.confirmed = undefined;

            poems[i].user_id = user;
        }

        poems.reverse();

        return res.json(poems);
    },
    async getByUser(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.userEmail } });

            if (!user) return res.status(404).send({ error: 'User not found' });

            const poems = await Poem.findAll({ where: { user_id: user.id } });

            user.password = undefined;
            user.password_reset_expires = undefined;
            user.password_reset_token = undefined;
            user.confirmed = undefined;

            for (let i = 0; i < poems.length; i++) {
                poems[i].user_id = user;
            }

            return res.json(poems);
        } catch (error) {
            return res.json(error);
        }
    },
    async store(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.userEmail } });

            if (!user) {
                return res.status(404).send({ error: 'User not found!' });
            };

            const { title, poem } = req.body;
            const user_id = user.id;

            const newPoem = await Poem.create({ title, poem, user_id });

            return res.json(newPoem);
        } catch (error) {
            return res.json(error)
        }
    },
    async delete(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.userEmail } });

            if (!user) {
                return res.status(404).send({ error: 'User not found!' });
            };

            const { poem_id } = req.params;
            const poem = await Poem.findByPk(poem_id);

            return res.json(await poem.destroy());
        } catch (error) {
            return res.json(error);
        }
    },
    async like(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findOne({ where: { email: req.userEmail } });
            const poem = await Poem.findByPk(id);

            if (!user) return res.status(404).send({ error: 'User not found' });
            if (!poem) return res.status(404).send({ error: 'Poem not found' });

            const user_id = user.id;
            const poem_id = poem.id;

            const like = await Like.create({ user_id, poem_id });

            return res.json(like)
        } catch (error) {
            return res.json(error);
        }
    },
    async dislike(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findOne({ where: { email: req.userEmail } });
            const poem = await Poem.findByPk(id);

            if (!user) return res.status(404).send({ error: 'User not found' });
            if (!poem) return res.status(404).send({ error: 'Poem not found' });

            const user_id = user.id;
            const poem_id = poem.id;

            const like = await Like.findOne({ where: { user_id: user_id, poem_id: poem_id } });

            return res.json(await like.destroy());
        } catch (error) {
            return res.json(error);
        }
    },
    async getMyLikes(req, res) {
        try {
            const { poem_id } = req.params;

            const poem = await Poem.findByPk(poem_id);

            if (!poem) return res.status(404).send({ error: 'Poem not found' });

            const likes = await Like.findAll({ where: { poem_id: poem_id } });

            return res.json(likes);
        } catch (error) {
            return res.json(error);
        }
    },
    async getById(req, res) {
        try {
            const { poem_id } = req.params;
            const poem = await Poem.findByPk(poem_id);
            const user = await User.findByPk(poem.user_id);

            user.password = undefined;
            user.password_reset_expires = undefined;
            user.password_reset_token = undefined;
            user.confirmed = undefined;

            if (!poem) return res.status(404).send({ error: 'Poem not found' });

            poem.user_id = user;

            return res.json(poem);
        } catch (error) {
            return res.json(error);
        }
    }
}