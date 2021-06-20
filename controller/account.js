const Account = require('../models').Account

module.exports = {

  getAll (req, res) {
    return Account
      .findAll()
      .then((accounts) => {
        return res.status(200).send(accounts)
      })
      .catch((error) => {
        res.status(400).send(error)
      })
  },

  getById (req, res) {
    return Account
      .findByPk(req.params.id)
      .then((account) => {
        if (!account) {
          return res.status(404).send({
            message: 'Conta não encontrada'
          })
        }
        return res.status(200).send(account)
      })
      .catch((error) => {
        res.status(400).send(error)
      })
  },

  add (req, res) {
    try {
      return Account
        .create(
          req.body
        )
        .then((account) => res.status(201).send(account))
        .catch((error) => res.status(400).send(error))
    } catch (err) {
      res.status(500).send('Algo de errado aconteceu. '+err)
    }
  },

  update (req, res) {
    return Account
      .findByPk(req.params.id)
      .then(account => {
        if (!account) {
          return res.status(404).send({
            message: 'Conta não encontrada.'
          })
        }

        account
          .update({
            number: req.body.number ?? account.number,
            balance: req.body.balance ?? account.balance,
            owner: req.body.owner ?? account.owner
          })
          .then(() => res.status(200).send(account))
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  },

  delete (req, res) {
    return Account
      .findByPk(req.params.id)
      .then(account => {
        if (!account) {
          return res.status(400).send({
            message: 'Conta Não Encontrada'
          })
        }
        return account
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error))
      })
      .catch((error) => res.status(400).send(error))
  }
}
