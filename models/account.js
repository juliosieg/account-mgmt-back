// Account Schema
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    number: DataTypes.INTEGER,
    balance: DataTypes.STRING,
    owner: DataTypes.STRING
  })
  Account.associate = function (models) {
    Account.hasMany(models.Action, {
      foreignKey: 'accountId',
      as: 'actions'
    })
  }
  return Account
}
