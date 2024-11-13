'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: async user => {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });

  User.associate = models => {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
  };

  return User;
};