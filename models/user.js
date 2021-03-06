'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Folder }) {
            // define association here
            this.hasMany(Folder, { foreignKey: 'userUuid', as: 'userFolder' });
        }
        toJSON() {
            return {...this.get(), password: undefined }
        };
    };
    User.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        roleName: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};