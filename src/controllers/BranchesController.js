const bcrypt = require('bcrypt')
const knex = require('../database')
const { roles } = require('../middlewares/roles')

// Controller
module.exports = {
  // Index
  async index(req, res) {
    const { id: user_id } = req.user
    const branches = await knex.select().from('branches').where({ user_id })

    return res.json(branches)
  },

  // Show
  async show(req, res) {
    const { id } = req.params
    const { id: user_id } = req.user

    const user = await knex
      .select()
      .from('branches')
      .where({ id, user_id })
      .first()

    return res.json(user)
  },

  // Create
  async create(req, res) {
    try {
      const { user_id, name, address, img_url } = req.body

      const [id] = await knex('branches')
        .insert({
          user_id,
          name,
          address,
          img_url
        })
        .returning('id')

      return res.json(id)
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'branch.create.nok'
      })
    }
  },

  // Update
  async update(req, res) {
    const { id } = req.params
    const { id: user_id } = req.user
    const { name, address, img_url } = req.body

    try {
      await knex('branches')
        .update({
          name,
          address,
          img_url
        })
        .where({ id, user_id })

      return res.status(200).send({
        success: true,
        message: 'branch.update.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: true,
        message: 'branch.update.nok'
      })
    }
  },

  // DELETE
  async delete(req, res) {
    const { id } = req.params
    const { id: user_id } = req.user

    try {
      await knex('branches').where({ id, user_id }).del()

      return res.status(200).send({
        success: true,
        message: 'branch.delete.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: 'branch.delete.nok'
      })
    }
  }
}
