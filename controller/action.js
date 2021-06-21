const Action = require('../models').Action
const Account = require('../models').Account

const Sequelize = require('sequelize')
const path = require('path')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/config.json'))[env]

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

module.exports = {

  getAllActionsFromAccount (req, res) {
    return Action
      .findAll({
        where: {
          accountId: req.params.accountId
        },
        order: [['createdAt', 'DESC']]
      })
      .then((actions) => {
        return res.status(200).send(actions)
      })
      .catch((error) => {
        res.status(400).send(error)
      })
  },

  async add (req, res) {
    let transaction

    try {
      transaction = await sequelize.transaction()

      req.body.accountId = req.params.accountId

      await Action.create(req.body, { transaction: transaction })

      const account = await Account.findByPk(req.params.accountId)

      if (!account) {
        if (transaction) await transaction.rollback()

        return res.status(400).send({
          message: 'Conta não encontrada'
        })
      }

      if (typeof (req.body.type) !== 'number') {
        return res.status(400).send({
          message: 'Formato do tipo é inválido'
        })
      }

      let newBalance = 0

      switch (req.body.type) {
        case 1:
        case 2:
          newBalance = account.balance - req.body.value
          break
        case 3:
          newBalance = account.balance + req.body.value
          break
      }

      if (newBalance < 0 && (req.body.type === 1 || req.body.type === 2)) {
        throw new Error('Saldo insuficiente')
      }

      await account.update({
        balance: newBalance,
        owner: req.body.owner ?? account.owner
      }, { transaction: transaction })

      await transaction.commit()
        .then((action) => res.status(201).send(action))
        .catch((error) => res.status(400).send(error))
    } catch (err) {
      res.status(500).send('Algo de errado aconteceu. ' + err)
      if (transaction) await transaction.rollback()
    }
  }
}
