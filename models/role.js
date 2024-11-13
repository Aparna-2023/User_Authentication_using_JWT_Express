'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true,
  });

  Role.associate = models => {
    Role.hasMany(models.User, { foreignKey: 'roleId' });
  };

  return Role;
};