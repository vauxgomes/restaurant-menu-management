const knex = require('../database')
const bcrypt = require('bcrypt')

// Controller
module.exports = {
  // Index
  async index(req, res) {
    const { id: user_id } = req.user
    const { branch_id } = req.params

    const categories = await knex
      .select('categories.*')
      .from('categories')
      .innerJoin('branches', 'categories.branch_id', 'branches.id')
      .where({ user_id, branch_id })

    return res.json(categories)
  },

  // Create
  async create(req, res) {
    try {
      const { id: user_id } = req.user
      const { branch_id } = req.params
      const { name, order = 0 } = req.body

      // Safety
      const branch = await knex
        .select()
        .from('branches')
        .where({ user_id, id: branch_id })
        .first()

      if (!branch) {
        return res.status(400).json({
          success: false,
          message: 'action.denied'
        })
      }

      // Insert
      const [id] = await knex('categories')
        .insert({
          branch_id,
          name,
          order
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
    const { branch_id, id } = req.params
    const { name, order } = req.body

    // Safety
    const branch = await knex
      .select()
      .from('branches')
      .where({ user_id, id: branch_id })
      .first()

    if (!branch) {
      return res.status(400).json({
        success: false,
        message: 'action.denied'
      })
    }

    try {
      await knex('categories').update({ name, order }).where({ id, branch_id })

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
    const { branch_id, id } = req.params

    // Safety
    const branch = await knex
      .select()
      .from('branches')
      .where({ user_id, id: branch_id })
      .first()

    if (!branch) {
      return res.status(400).json({
        success: false,
        message: 'action.denied'
      })
    }

    try {
      await knex('categories').where({ id, branch_id }).del()

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
