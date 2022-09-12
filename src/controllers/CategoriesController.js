const knex = require('../database')
const bcrypt = require('bcrypt')

// Controller
module.exports = {
  // Index
  async index(req, res) {
    const { id: user_id } = req.user

    const categories = await knex.select().from('categories').where({ user_id })

    return res.json(categories)
  },

  // Create
  async create(req, res) {
    try {
      const { id: user_id } = req.user
      const { name, order = 0 } = req.body

      const [id] = await knex('categories')
        .insert({
          name,
          order,
          user_id
        })
        .returning('id')

      return res.json(id)
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'category.create.nok'
      })
    }
  },

  // Update
  async update(req, res) {
    const { id: user_id } = req.user
    const { id } = req.params
    const { name, order } = req.body

    try {
      await knex('categories')
        .update({
          name,
          order
        })
        .where({ id, user_id })

      return res.status(200).send({
        success: true,
        message: 'category.update.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: true,
        message: 'category.update.nok'
      })
    }
  },

  // DELETE
  async delete(req, res) {
    const { id: user_id } = req.user
    const { id } = req.params

    try {
      await knex('categories').where({ id, user_id }).del()

      return res.status(200).send({
        success: true,
        message: 'category.delete.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: 'category.delete.nok'
      })
    }
  }
}
