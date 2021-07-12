'use strict';

const { query } = require("express");

module.exports = {
    up: async(queryInterface, Sequelize) => {

        return await queryInterface.bulkInsert('Users', [{
            uuid: 'bbab456f-5223-4809-ba14-ba2bf7a19de0',
            username: 'admin',
            password: '$2b$10$V6do9ZK8C3UxSKi7YkN.KO1wMIJY/TPDE1REGaKe/bC6faMxsUxte',
            roleName: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        }])
    },

    down: async(queryInterface, Sequelize) => {
        return await queryInterface.bulkDelete('Users', null, {})
    }
};