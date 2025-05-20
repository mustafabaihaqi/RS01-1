const express = require('express');
const router = express.Router();
const { createQueue, getQueues, deleteQueue, deleteQueueByNumber } = require('../controllers/queueController');

router.post('/', createQueue);
router.get('/', getQueues);

module.exports = router;