'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      message: {
        type: Sequelize.STRING,
      },
      message_status: {
        type: Sequelize.ENUM('sent', 'pending'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      receiver: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Contacts', key: 'phoneNumber' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      sender: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'Contacts', key: 'phoneNumber' },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Messages')
  },
}
