'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Folder extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ User, Task }) {
            // define association here
            this.belongsTo(User, { foreignKey: 'user_id', as: 'folder_user' });
            this.hasMany(Task, { foreignKey: 'folder_id', as: 'folder_task' });
        }
        toJSON() {
            return {...this.get(), id: undefined, user_id: undefined }
        };
    };
    Folder.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Folder',
    });
    return Folder;
};