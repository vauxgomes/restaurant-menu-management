const express = require('express')
const routes = express.Router()

// Middlewares
const auth = require('./middlewares/auth')
const { roles, permissions } = require('./middlewares/roles')

//
const AccountsController = require('./controllers/AccountsController')
const UsersController = require('./controllers/UsersController')
const BranchesController = require('./controllers/BranchesController')

const CategoriesController = require('./controllers/CategoriesController')
const ItemsController = require('./controllers/ItemsController')

const RestaurantsController = require('./controllers/RestaurantsController')

// System
routes.get('/sys', (req, res) => {
  return res.send({
    system: 'Servidor de Cardápios e Pedidos',
    version: 1.0,
    request_date: new Date().toLocaleString()
  })
})

// Accounts
routes.post('/login', AccountsController.register)

// Users
routes.get('/users', auth, permissions([roles.ROOT]), UsersController.index)
routes.get('/users/detail', auth, UsersController.show)
routes.post(
  '/users/create',
  auth,
  permissions([roles.ROOT]),
  UsersController.create
)
routes.put('/users/update', auth, UsersController.update)
routes.delete(
  '/users/:id/delete',
  auth,
  permissions([roles.ROOT]),
  UsersController.delete
)

// Branches
routes.get('/branches', auth, BranchesController.index)
routes.get('/branches/:id/detail', auth, BranchesController.show)
routes.post(
  '/branches/create',
  auth,
  permissions([roles.ROOT]),
  BranchesController.create
)
routes.put('/branches/:id/update', auth, BranchesController.update)
routes.delete('/branches/:id/delete', auth, BranchesController.delete)

// Categories
routes.get('/branches/:branch_id/categories', auth, CategoriesController.index)
routes.post(
  '/branches/:branch_id/categories/create',
  auth,
  CategoriesController.create
)
routes.put(
  '/branches/:branch_id/categories/:id/update',
  auth,
  CategoriesController.update
)
routes.delete(
  '/branches/:branch_id/categories/:id/delete',
  auth,
  CategoriesController.delete
)

// Items
routes.get(
  '/categories/:category_id/items',
  auth,
  permissions([roles.USER]),
  ItemsController.index
)
routes.post(
  '/categories/:category_id/items/create',
  auth,
  permissions([roles.USER]),
  ItemsController.create
)
routes.put(
  '/categories/:category_id/items/:id/update',
  auth,
  permissions([roles.USER]),
  ItemsController.update
)
routes.delete(
  '/categories/:id/items/:id/delete',
  auth,
  permissions([roles.USER]),
  ItemsController.delete
)

// Restaurants
routes.get('/restaurants/:id', RestaurantsController.show)

// Export
module.exports = routes
