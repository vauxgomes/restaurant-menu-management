const bcrypt = require('bcrypt')
const knex = require('../database')
const { roles } = require('../middlewares/roles')

// Controller
module.exports = {
  // Index
  async index(req, res) {
    const users = await knex
      .select('id', 'username', 'name', 'role')
      .from('users')

    return res.json(users)
  },

  // Show
  async show(req, res) {
    const { id } = req.user

    const user = await knex
      .select('id', 'username', 'name', 'role')
      .from('users')
      .where('id', id)
      .first()

    return res.json(user)
  },

  // Create
  async create(req, res) {
    try {
      let { name, username, password } = req.body
      password = bcrypt.hashSync(password, Number(process.env.SALT))

      const [id] = await knex('users')
        .insert({
          name,
          username,
          password,
          role: roles.USER
        })
        .returning('id')

      return res.json(id)
    } catch (err) {
      // console.log(err)

      return res.status(400).json({
        success: false,
        message: 'user.create.nok'
      })
    }
  },

  // Update
  async update(req, res) {
    const { id } = req.user
    let { name, username, password } = req.body

    if (password) {
      password = bcrypt.hashSync(password, Number(process.env.SALT))
    }

    try {
      await knex('users')
        .update({
          name,
          username,
          password
        })
        .where('id', id)

      return res.status(200).send({
        success: true,
        message: 'user.update.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: true,
        message: 'user.update.nok'
      })
    }
  },

  // DELETE
  async delete(req, res) {
    const { id } = req.params

    try {
      await knex('users').where('id', id).del()

      return res.status(200).send({
        success: true,
        message: 'user.delete.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: 'user.delete.nok'
      })
    }
  }
}
