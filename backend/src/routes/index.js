const express = require('express');
const authController = require('../controllers/authController');
const snapshotController = require('../controllers/snapshotController');

const router = express.Router();

// Authentication routes
router.post('/auth/login', authController.login);

// Snapshot routes
router.post('/snapshots', snapshotController.createSnapshot);
router.get('/snapshots/:id', snapshotController.getSnapshot);

module.exports = router;
