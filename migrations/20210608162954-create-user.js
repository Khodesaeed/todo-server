'use strict';
module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            username: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            role_name: {
                type: DataTypes.STRING(10),
                allowNull: false
            }
        });
    },
    down: async(queryInterface, DataTypes) => {
        await queryInterface.dropTable('Users');
    }
};