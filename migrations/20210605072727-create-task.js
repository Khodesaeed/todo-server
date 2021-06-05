'use strict';
module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('Tasks', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            title: {
                type: DataTypes.STRING
            },
            desciption: {
                type: DataTypes.STRING
            },
            finish_at: {
                type: DataTypes.DATE
            },
            start_at: {
                type: DataTypes.DATE
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        });
    },
    down: async(queryInterface, DataTypes) => {
        await queryInterface.dropTable('Tasks');
    }
};