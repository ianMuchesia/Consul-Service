const {
  parentModel,
  parentSchemaOptions,
  parentSchemaName,
} = require("./parents");

const {
  serviceModel,
  serviceSchemaOptions,
  serviceSchemaName,
} = require("./services");

module.exports = (db) => {
  const Parent = db.define(parentSchemaName, parentModel, parentSchemaOptions);
  const Service = db.define(
    serviceSchemaName,
    serviceModel,
    serviceSchemaOptions
  );

  Parent.hasMany(Service, {
    foreignKey: "parent_id",
    sourceKey: "id",
    as: "services",
    onDelete: "CASCADE",
  });
  Service.belongsTo(Parent, {
    foreignKey: "parent_id",
    targetKey: "id",
    as: "parent",
  });

  return {
    Parent,
    Service,
  };
};
