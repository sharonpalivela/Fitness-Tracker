const express = require('express');
const router = express.Router();

const { logWorkout } = require('../controllers/planController');
const protect = require('../middleware/authMiddleware'); 

console.log('logWorkout:', logWorkout);
console.log('protect:', protect);       

router.post('/log', protect, logWorkout);

module.exports = router;
