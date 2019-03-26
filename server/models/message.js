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
      foreignKey: {
        name: 'sender',
        key: 'phoneNumber',
      },
      onDelete: 'CASCADE',
      targetKey: 'phoneNumber',
    })
    Message.belongsTo(models.Contact, {
      foreignKey: {
        name: 'receiver',
        key: 'phoneNumber',
      },
      onDelete: 'CASCADE',
      targetKey: 'phoneNumber',
    })
  }

  return Message
}
