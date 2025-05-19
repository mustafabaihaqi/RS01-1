const express = require('express');
const router = express.Router();
const { createQueue, getQueues, deleteQueue, deleteQueueByNumber } = require('../controllers/queueController');

router.post('/', createQueue);
router.get('/', getQueues);
router.delete('/:id', deleteQueue);
router.delete('/number/:queueNumber', deleteQueueByNumber);

module.exports = router;