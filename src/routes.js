const express = require('express')
const routes = express.Router()

// Middlewares
const auth = require('./middlewares/auth')
const { roles, permissions } = require('./middlewares/roles')

//
const AccountsController = require('./controllers/AccountsController')
const UsersController = require('./controllers/UsersController')
const CategoriesController = require('./controllers/CategoriesController')
const ItemsController = require('./controllers/ItemsController')

const RestaurantsController = require('./controllers/RestaurantsController')

// System
routes.get('/', (req, res) => {
  return res.send({
    system: 'Servidor Simples de Cardápios',
    version: 1.0,
    request_date: new Date().toLocaleString()
  })
})

// Accounts
routes.post('/login', AccountsController.register)

// Users
routes.get(
  '/users/detail',
  auth,
  permissions([roles.ROOT, roles.USER]),
  UsersController.show
)
routes.put(
  '/users/update',
  auth,
  permissions([roles.ROOT, roles.USER]),
  UsersController.update
)

// Users:ROOT
routes.get('/users', auth, permissions([roles.ROOT]), UsersController.index)
routes.post(
  '/users/create',
  auth,
  permissions([roles.ROOT]),
  UsersController.create
)
routes.delete(
  '/users/:id/delete',
  auth,
  permissions([roles.ROOT]),
  UsersController.delete
)

// Categories
routes.get(
  '/categories',
  auth,
  permissions([roles.USER]),
  CategoriesController.index
)
routes.post(
  '/categories/create',
  auth,
  permissions([roles.USER]),
  CategoriesController.create
)
routes.put(
  '/categories/:id/update',
  auth,
  permissions([roles.USER]),
  CategoriesController.update
)
routes.delete(
  '/categories/:id/delete',
  auth,
  permissions([roles.USER]),
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
