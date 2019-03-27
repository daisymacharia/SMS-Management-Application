'use strict'
export default (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Message cannot be empty',
          },
        },
      },
      message_status: DataTypes.ENUM('sent', 'pending'),
    },
    {}
  )

  Message.associate = models => {
    Message.belongsTo(models.Contact, {
      foreignKey: 'senderId',
      onDelete: 'CASCADE',
    })
  }
  Message.associate = models => {
    Message.belongsTo(models.Contact, {
      foreignKey: 'receiverId',
      onDelete: 'CASCADE',
    })
  }

  return Message
}
