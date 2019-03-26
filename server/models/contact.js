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

  return Contact
}
