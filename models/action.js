// Action Schema
module.exports = (sequelize, DataTypes) => {
  const Action = sequelize.define('Action', {
    description: DataTypes.STRING,
    value: DataTypes.FLOAT,
    type: DataTypes.INTEGER
  })
  Action.associate = function (models) {
    Action.belongsTo(models.Account, {
      onDelete: 'CASCADE',
      foreignKey: 'accountId'
    })
  }
  return Action
}
