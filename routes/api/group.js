const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Group = require('../../models/Group');

router.post(
    '/',
    [auth, [check('name', 'Name is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, status, admin, adminname } = req.body;

        const user = await User.findById(req.user.id).select("-password");


        const groupFields = {};

        if (name) groupFields.name = name;
        if (description) groupFields.description = description;
        if (status) groupFields.status = status;
        groupFields.admin = user;
        groupFields.adminname = user.name;

        try {
            let group = await Group.findOne({ user: req.user.id });


            group = new Group(groupFields);
            group.members.unshift({ user: req.user.id });
            await group.save();
            res.json(group);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);


router.get('/', async (req, res) => {
    try {
        const groups = await Group.find().populate('user', ['name']);
        res.json(groups);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.get('/:group_id', async (req, res) => {
    try {
        const group = await Group.findOne({
            _id: req.params.group_id
        }).populate('user', ['name']);

        if (!group) return res.status(400).json({ msg: 'Group not found' });

        res.json(group);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Group not found' });
        }
        res.status(500).send('Server Error');
    }
});


router.delete('/:group_id', auth, async (req, res) => {
    try {
        await Group.findOneAndRemove({ _id: req.params.group_id });

        res.json({ msg: 'Group removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.put('/members/:id', auth, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (
            group.members.filter(members => members.user.toString() === req.user.id)
                .length > 0
        ) {
            return res.status(400).json({ msg: 'You are alredy in this gorup' });
        }

        group.members.unshift({ user: req.user.id });

        await group.save();

        res.json(group.members);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.put('/leave/:id', auth, async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (
            group.members.filter(members => members.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: 'You are alredy in this gorup' });
        }

        const removeIndex = group.members
            .map(members => members.user.toString())
            .indexOf(req.user.id);

        group.members.splice(removeIndex, 1);

        await group.save();

        res.json(group.members);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


router.put(
    '/:group_id',
    [auth, [check('name', 'Name is required').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, members, status, admin } = req.body;


        const groupFields = {};

        if (name) groupFields.name = name;
        if (description) groupFields.description = description;
        groupFields.status = status ? true : false;
        if (admin) groupFields.admin = admin;

        try {
            let group = await Group.findOne({ _id: req.params.group_id });

            if (group) {
                group = await Group.findOneAndUpdate(
                    { _id: req.params.group_id },
                    { $set: groupFields },
                    { new: true }
                );
                res.json(group);
            }

            await group.save();
            res.json(group);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;