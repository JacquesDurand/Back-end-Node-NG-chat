var express = require('express');
var router = express.Router();

var message_controller = require('../controllers/message.controller');

router.post('/last', message_controller.getLastMessagesFromConversation);

router.post('/add', message_controller.createMessage);

module.exports = router ;