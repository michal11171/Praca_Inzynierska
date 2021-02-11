const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Message = require('../../models/Message');
const Thread = require('../../models/Thread');
/**
 * Tutaj pobierasz liste wątków zalogowanego usera
 */
router.get('/threads', auth, async (req, res) => {
    try {
        let threads = await Thread.find({ user1: req.user.id });
        threads = [...threads, ...(await Thread.find({ user2: req.user.id }))]
        res.json({ threads });
    }

    catch (e) {
        res.status(400).send('Server Error');
    }
});

/**
 *  Tutaj szukasz wątu między dwoma użytkownikami, jeżeli go nie ma to go tworzysz
 */
router.post('/get_thread', auth, async (req, res) => {
    try {
        const user2Id = req.body.user2;
        let threads = await Thread.find({ user1: req.user.id, user2: user2Id });
        threads = [...threads, ...(await Thread.find({ user1: user2Id, user2: req.user.id }))];
        let responseThread;
        if (threads.length > 0) {
            responseThread = threads[0];
        } else {
            const thread = new Thread({
                user1: req.user.id,
                user2: user2Id
            });
            await thread.save();
            responseThread = thread;
        }
        const messages = await Message.find({ thread: responseThread._id });
        res.json({ thread: responseThread, messages });
    }

    catch (e) {
        console.error(e.message);
        res.status(400).send('Server Error');
    }
});

/**
 * A tu wysyłasz wiadomość mordeczko
 */
router.post('/send/:threadId', auth, async (req, res) => {
    try {
        const messageBody = req.body;
        const thread = await Thread.findById(req.params.threadId);
        if (!thread) {
            res.status(404).send('Thread not found');
        } else {
            const message = new Message({
                thread: req.params.threadId,
                content: messageBody.content,
                sender: req.user.id
            });
            await message.save();
            res.status(201).send({ message });
        }
    }
    catch (e) {
        console.error(e.message);
        res.status(400).send('Server Error');
    }
})

module.exports = router;
