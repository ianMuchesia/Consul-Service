const Sequelize = require("sequelize");

const model = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
};

const tableName = "tbl_parents";

const schemaOptions = {
  timestamps: false,
  freezeTableName: true,
  tableName,
};

exports.parentModel = model;
exports.parentSchemaOptions = schemaOptions;
exports.parentSchemaName = tableName;
