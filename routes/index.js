// index.js
const accountController = require('../controller').account
const actionsController = require('../controller').action

module.exports = app => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      data: 'Accounts API'
    })
  })

  // Account
  app.get('/api/accounts', accountController.getAll)
  app.get('/api/account/:id', accountController.getById)
  app.put('/api/account/:id', accountController.update)
  app.post('/api/account', accountController.add)
  app.delete('/api/account/:id', accountController.delete)

  // Actions
  app.get('/api/account/:accountId/actions', actionsController.getAllActionsFromAccount)
  app.post('/api/account/:accountId/actions', actionsController.add)
  
}
