const express = require('express');
const router = express.Router();
const Reward = require('../models/badge');

// GET all badges for a user
router.get('/:userId', async (req, res) => {
    try {
        const rewards = await Reward.find({ userId: req.params.userId, type: 'badge' });
        res.json(rewards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new badge
router.post('/', async (req, res) => {
    const reward = new Reward({
        userId: req.body.userId,
        type: 'badge',
        badgeName: req.body.badgeName,
        description: req.body.description
    });

    try {
        const newReward = await reward.save();
        res.status(201).json(newReward);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

