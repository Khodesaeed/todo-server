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
            this.belongsTo(User, { foreignKey: 'userUuid', as: 'folderUser' });
            this.hasMany(Task, { foreignKey: 'folderUuid', as: 'folderTask' });
        }
        toJSON() {
            return {...this.get(), user_id: undefined }
        };
    };
    Folder.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        userUuid: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Folder',
    });
    return Folder;
};