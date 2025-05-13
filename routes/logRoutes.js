const express = require('express');
const router = express.Router();
const { logWorkout } = require('../controllers/logController');
const authMiddleware = require('../middleware/authMiddleware'); // to get req.user

// Test route to check if the route is working
router.get('/test', (req, res) => {
  res.send("Log route is working");
});

console.log('POST /api/logs/log route hit');
router.post('/log', authMiddleware, logWorkout);

module.exports = router;
