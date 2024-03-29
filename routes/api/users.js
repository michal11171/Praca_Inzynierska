const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');


router.post('/', [
    check('name', 'Imię i nazwisko jest wymagane')
        .not()
        .isEmpty(),
    check('email', 'Wprowadź poprawny email').isEmail(),
    check('password', 'Hasło musi mieć minimum 6 znaków').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, admin = "false", ban = "false" } = req.body;

        try {

            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'Ten adres email jest już zarejestrowany' }] });
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password,
                admin,
                ban
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtToken'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }



    });

router.put('/ban/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.ban = "true"

        await user.save();
        res.json(user.ban);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/unban/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.ban = "false"

        await user.save();
        res.json(user.ban);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;