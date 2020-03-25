const Conversation = require('../models').Conversation;
const Message = require('../models').Message;
const Op = require('sequelize').Op;


// exports.findOrCreateConversation = (userId1, userId2) => {
//   return  Conversation.findOne({
//         where: {
//             user1Id: {
//                 [Op.or]: [userId1, userId2]
//             },
//             user2Id: {
//                 [Op.or]: [userId1, userId2]
//             }
//         },
//         include: [Message],
//         order: [[Message, 'createdAt', 'DESC']]
//     })
//         .then(conversation => {
//             if (conversation) {
//                 return conversation;
//             }
//             else {
//                 return Conversation.create(
//                     {
//                         user1Id: userId1,
//                         user2Id: userId2
//                     },
//                     {
//                         include: [Message],
//                         order: [[Message, 'createdAt', 'DESC']]
//                     }
//                 )
//             }
//         })
// }

exports.getLastConv = (req, res, next) => {
    let userId = req.body.id;
    Conversation.findAll({
        where: {
            user1Id: userId
        },
        limit: 10
    })
        .then(conversations => {
            res.status(200).json(conversations);
        })
        .catch(error => {
            res.status(500).json(error);
        })
}


exports.findOrCreateConversation = (req, res, next) => {
    let user1Id = req.body.user1Id;
    let user2Id = req.body.user2Id;

    Conversation.findOne({
        where: {
            user1Id: {
                [Op.or]: [user1Id, user2Id]
            },
            user2Id: {
                [Op.or]: [user2Id, user1Id]
            }
        }
    })
        .then(conversation => {
            console.log(conversation);
            
            if (!conversation) {

                Conversation.create({
                    user1Id: user1Id,
                    user2Id: user2Id
                })
                    .then(conversation => {
                        res.status(200).json(conversation);
                    })
                    .catch(error => {
                        res.status(500).json(error)
                    })
            }
            else {
                res.status(200).json(conversation);
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
}