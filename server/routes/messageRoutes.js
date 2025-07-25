const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {sendMessage, getMessages, } = require('../controllers/messageController');
const { route } = require('./protectedRoutes');


router.post('/', authMiddleware, sendMessage);
router.get('/:userId', authMiddleware, getMessages);

module.exports = router;
