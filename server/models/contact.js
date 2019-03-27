'use strict'
export default (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Phone number already exists',
        },
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  )

  Contact.associate = models => {
    Contact.hasMany(models.Message, {
      foreignKey: 'senderId',
      as: 'sender',
    })
    Contact.hasMany(models.Message, {
      foreignKey: 'receiverId',
      as: 'receiver',
    })
  }

  return Contact
}
