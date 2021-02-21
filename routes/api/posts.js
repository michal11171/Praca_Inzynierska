const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');


router.post('/', [auth, [
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

            const [user, profile] = await Promise.all([
                User.findById(req.user.id).select('-password'),
                Profile.findOne({ user: req.user.id })
            ]);

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
                location: profile ? profile.location : 'Nie podano',
                types: req.body.types,
                title: req.body.title,
                typeOS: req.body.typeOS,
                type: req.body.type,
                from: req.body.from,
                to: req.body.to,
                rate: req.body.rate,
                report: "false"
            });

            const post = await newPost.save();

            res.json(post);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });


router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});


router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }


        if (post.user.toString() !== req.user.id) {
            if (user.admin === "true") {
                await post.remove();
            }
            else {
                return res.status(401).json({ msg: 'User not authorized' });
            }
        }

        await post.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});


router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);

            await post.save();
            res.json(post.likes);
        }
        else {
            post.likes.unshift({ user: req.user.id });

            await post.save();
            res.json(post.likes);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }


        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();
        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post('/comment/:id', [auth, [
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
            const post = await Post.findById(req.params.id);
            const profile = await Profile.findOne({ user: req.user.id })

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
                location: profile ? profile.location : 'Nie podano'
            };

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });


router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id);

        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }


        if (comment.user.toString() !== req.user.id) {

            if (user.admin === "true") {
                const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
                post.comments.splice(removeIndex, 1);

                await post.save();
                res.json(post.comments);
            }
            else {
                return res.status(401).json({ msg: 'User not authorized' });
            }
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/favourite/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.favourites.filter(favourite => favourite.user.toString() === req.user.id).length > 0) {
            const removeIndex = post.favourites.map(favourite => favourite.user.toString()).indexOf(req.user.id);
            post.favourites.splice(removeIndex, 1);
            await post.save();
            res.json(post.favourites);
        }
        else {
            post.favourites.unshift({ user: req.user.id });

            await post.save();
            res.json(post.favourites);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.put('/unfavourite/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.favourites.filter(favourite => favourite.user.toString() === req.user.id).length == 0) {
            return res.status(400).json({ msg: 'Post has not yet been added to favourites' });
        }


        const removeIndex = post.favourites.map(favourite => favourite.user.toString()).indexOf(req.user.id);
        post.favourites.splice(removeIndex, 1);

        await post.save();
        res.json(post.favourites);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/report/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.reports.filter(report => report.user.toString() === req.user.id).length > 0) {

        }
        else {
            post.reports.unshift({ user: req.user.id });

            await post.save();
            res.json(post.reports);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/unreport/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.reports.filter(report => report.user.toString() === req.user.id).length == 0) {

        }


        post.reports = [];

        await post.save();
        res.json(post.reports);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;