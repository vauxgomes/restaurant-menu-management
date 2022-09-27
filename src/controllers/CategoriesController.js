const knex = require('../database')

// Controller
module.exports = {
  // Index
  async index(req, res) {
    const { branch_id } = req.params

    const categories = await knex
      .select()
      .from('categories')
      .where({ branch_id })
      .orderBy('order', 'asc')

    return res.json(categories)
  },

  // Create
  async create(req, res) {
    try {
      const { branch_id } = req.params
      const { name, order = 0 } = req.body

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
    const { id, branch_id } = req.params
    const { name, order } = req.body

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
    const { id, branch_id } = req.params

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
