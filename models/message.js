'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    conversationId : DataTypes.INTEGER   
  }, {});
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.Conversation, {
      foreignKey: {
        allowNull : false
      }
    });

    
  };
  return Message;
};