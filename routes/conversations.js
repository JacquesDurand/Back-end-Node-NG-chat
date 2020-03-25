var express = require('express');
var router = express.Router();
var conversation_controller = require('../controllers/conversation.controller');

router.post('/lastconv', conversation_controller.getLastConv);

router.post('/findCreate', conversation_controller.findOrCreateConversation);

module.exports = router;
