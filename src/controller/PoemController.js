const Poem = require('../models/Poem');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        return res.json(await Poem.findAll());
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
    }
}