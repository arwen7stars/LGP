const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const houseRoutes = require('./house.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status.json', (req, res) => res.send({"status": "ok"}));

/**
 * GET v1/users
 */
router.use('/users', userRoutes);

/**
 * GET v1/users
 */
router.use('/auth', authRoutes);

/**
 * GET v1/house
 */

router.use('/houses', houseRoutes);

module.exports = router;
