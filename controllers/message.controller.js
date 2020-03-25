const Message = require('../models').Message;
const Conversation = require('../models').Conversation;
const conversation_controller = require('./conversation.controller');

// exports.createMessage = (content, sender, receiver) => {
//     return Promise.all([
//         Message.create({
//             content: content
//         }),
//         conversation_controller.findOrCreateConversation(sender.id, receiver.id)
//     ])
//         .then(
//             ([message, conversation]) => {
//                 message.setConversation(conversation)
//             }
//         )
// };

exports.getLastMessagesFromConversation = (req, res, next) => {
    let convId = req.body.id;
    Message.findAll({
        where: {
            conversationId: convId
        },
        limit: 10,
        order: [['createdAt','DESC']]
    })
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.createMessage = (req, res, next) => {
    let newMessage = req.body;
    Message.create(newMessage)
        .then(() => {
            res.status(200).json(newMessage);
        })
        .catch(error => {
            res.status(500).json(error);
        })
}

