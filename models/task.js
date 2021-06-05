'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Folder }) {
            // define association here
            this.belongsTo(Folder, { foreignKey: 'folder_ir', as: 'task_folder' });
        }
        toJSON() {
            return {...this.get(), id: undefined, folder_id: undefined }
        };
    };
    Task.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desciption: {
            type: DataTypes.STRING,
            allowNull: true
        },
        finish_at: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_at: {
            type: DataTypes.STRING,
            allowNull: true
        },
        folder_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Task',
    });
    return Task;
};