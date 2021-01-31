const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { compare } = require('bcryptjs');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar', 'ban']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private

router.post('/', [
    auth, [
        check('status', 'Status is required')
            .not()
            .isEmpty(),
        check('skills', 'Skills is required')
            .not()
            .isEmpty()
    ]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            location,
            status,
            skills,
            bio,
            twitter,
            facebook,
            linkedin
        } = req.body;

        //build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        //build social object
        profileFields.social = {};
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar', 'ban']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get all profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar', 'ban']);
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
})

// @route   DELETE api/profile
// @desc    Delete profile, user and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        //Remove user posts
        await Post.deleteMany({ user: req.user.id });
        //Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private

router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Title is required')
                .not()
                .isEmpty(),
            check('company', 'Company is required')
                .not()
                .isEmpty(),
            check('from', 'From date is required')
                .not()
                .isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete one of profile experiences
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route   POST api/profile/commentP/:id
// @desc    Comment on a post
// @access  Private
router.post('/commentP/:id', [auth, [
    check('text', 'Text is required')
        .not()
        .isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');
            const profile = await Profile.findById(req.params.id);

            const newCommentP = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            profile.comments.unshift(newCommentP);

            await profile.save();

            res.json(profile.comments);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });
// @route   DELETE api/profile/commentP/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/commentP/:id/:comment_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        const user = await User.findById(req.user.id);

        // Pull out comment
        const comment = profile.comments.find(comment => comment.id === req.params.comment_id);
        //Make sure comment exist
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        //Check if user is author of the comment
        if (comment.user.toString() !== req.user.id) {
            if (user.admin === "true") {
                const removeIndex = profile.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
                profile.comments.splice(removeIndex, 1);

                await profile.save();
                res.json(profile.comments);
            }
            else {
                return res.status(401).json({ msg: 'User not authorized' });
            }

        }
        //Get remove index
        const removeIndex = profile.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        profile.comments.splice(removeIndex, 1);

        await profile.save();
        res.json(profile.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route   PUT api/profile/like/:id
// @desc    Like a profile
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        //Check if profile has already been liked  
        if (profile.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            const removeIndex = profile.likes.map(like => like.user.toString()).indexOf(req.user.id);
            profile.likes.splice(removeIndex, 1);

            await profile.save();
            res.json(profile.likes);
        }
        else {

            if (profile.unlikes.filter(unlike => unlike.user.toString() === req.user.id).length > 0) {
                console.log("MASZ UNLIKE");
            }
            else {
                profile.likes.unshift({ user: req.user.id });

                await profile.save();
                res.json(profile.likes);
            }
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/profile/unlike/:id
// @desc    Unlike a profile
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findById(req.params.id);
        //Check if profile has already been liked  
        if (profile.unlikes.filter(unlike => unlike.user.toString() === req.user.id).length > 0) {
            const removeIndex = profile.unlikes.map(unlike => unlike.user.toString()).indexOf(req.user.id);
            profile.unlikes.splice(removeIndex, 1);

            await profile.save();
            res.json(profile.unlikes);
        }
        else {


            if (profile.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                console.log("MASZ LAJKA")
            }
            else {
                profile.unlikes.unshift({ user: req.user.id });

                await profile.save();
                res.json(profile.unlikes);
            }
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/profile/likes/:user_id
// @desc    Get all likes by profile ID
// @access  Public
router.get('/likes/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('likes');
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
})
module.exports = router;