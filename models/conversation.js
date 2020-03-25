'use strict';
module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {

    }, {});
    Conversation.associate = function (models) {
        // associations can be defined here
        Conversation.belongsTo(models.User, { as: 'user1' }, {
            foreignKey : {
                allowNull : false
            }
        });
        Conversation.belongsTo(models.User, { as: 'user2' }, {
            foreignKey : {
                allowNull : false
            }
        });

        Conversation.hasMany(models.Message)
    };
    return Conversation;
};