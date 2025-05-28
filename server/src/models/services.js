const Sequelize = require("sequelize");

const model = 
{
    service_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    id:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    parent_id: {
      type: Sequelize.UUID,
      allowNull: false
    },
    aid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    port: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
 tags: {
        type: Sequelize.TEXT, // Store as JSON string
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('tags');
            if (!rawValue) return null;
            try {
                return JSON.parse(rawValue);
            } catch (e) {
                return null;
            }
        },
        set(value) {
            if (value === null || value === undefined) {
                this.setDataValue('tags', null);
            } else {
                this.setDataValue('tags', JSON.stringify(value));
            }
        }
    },
    meta: {
        type: Sequelize.TEXT, // Store as JSON string
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('meta');
            if (!rawValue) return null;
            try {
                return JSON.parse(rawValue);
            } catch (e) {
                return null;
            }
        },
        set(value) {
            if (value === null || value === undefined) {
                this.setDataValue('meta', null);
            } else {
                this.setDataValue('meta', JSON.stringify(value));
            }
        }
    },
    check: {
        type: Sequelize.TEXT, // Store as JSON string
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('check');
            if (!rawValue) return null;
            try {
                return JSON.parse(rawValue);
            } catch (e) {
                return null;
            }
        },
        set(value) {
            if (value === null || value === undefined) {
                this.setDataValue('check', null);
            } else {
                this.setDataValue('check', JSON.stringify(value));
            }
        }
    }
};





const tableName = "tbl_services";

const schemaOptions = 
{
    timestamps:false,
    freezeTableName:true,
    tableName,
}



exports.serviceModel = model;
exports.serviceSchemaOptions = schemaOptions;
exports.serviceSchemaName = tableName;
