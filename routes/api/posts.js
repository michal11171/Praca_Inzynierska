const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create post
// @access  Private
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
            //const user = await User.findById(req.user.id).select('-password');
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
                report: "false"
            });

            const post = await newPost.save();

            res.json(post);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

// @route   Get api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   Get api/posts/:id
// @desc    Get post by ID
// @access  Private
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

// @route   Delete api/posts/:id
// @desc    Delete a post by ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check if user is a author of the post
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

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if post has already been liked  
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

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if post has already been liked  
        if (post.likes.filter(like => like.user.toString() === req.user.id).length == 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }

        // Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);

        await post.save();
        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
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

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id);
        // Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        //Make sure comment exist
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' });
        }

        //Check if user is author of the comment
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
        //Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route   PUT api/posts/favourite/:id
// @desc    Add a post to favourites
// @access  Private
router.put('/favourite/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if post has already been liked  
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

// @route   PUT api/posts/unfavourite/:id
// @desc    Delete a post from favourites
// @access  Private
router.put('/unfavourite/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if post has already been liked  
        if (post.favourites.filter(favourite => favourite.user.toString() === req.user.id).length == 0) {
            return res.status(400).json({ msg: 'Post has not yet been added to favourites' });
        }

        // Get remove index
        const removeIndex = post.favourites.map(favourite => favourite.user.toString()).indexOf(req.user.id);
        post.favourites.splice(removeIndex, 1);

        await post.save();
        res.json(post.favourites);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route   PUT api/posts/report/:id
// @desc    Report a post
// @access  Private
router.put('/report/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if post has already been reported 
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
// @route   PUT api/posts/unreport/:id
// @desc    Unreport a post
// @access  Private
router.put('/unreport/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //Check if post has reports 
        if (post.reports.filter(report => report.user.toString() === req.user.id).length == 0) {

        }

        // Get remove index

        post.reports = [];

        await post.save();
        res.json(post.reports);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;