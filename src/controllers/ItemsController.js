const knex = require('../database')

// Controller
module.exports = {
  // Index
  async index(req, res) {
    const { id: user_id } = req.user
    const { category_id } = req.params

    const items = await knex
      .select()
      .from('items')
      .innerJoin('categories', 'items.category_id', 'categories.id')
      .innerJoin('branches', 'categories.branch_id', 'branches.id')
      .innerJoin('users', 'branches.user_id', 'users.id')
      .where({ category_id, user_id })

    return res.json(items)
  },

  // Create
  async create(req, res) {
    try {
      const { category_id } = req.params
      const { id: user_id } = req.user
      const { name, description, price, img_url, order = 0 } = req.body

      const [id] = await knex('items')
        .insert({
          name,
          description,
          price,
          img_url,
          order,
          category_id,
          user_id
        })
        .returning('id')

      return res.json(id)
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: 'item.create.nok'
      })
    }
  },

  // Update
  async update(req, res) {
    const { category_id, id } = req.params
    const { id: user_id } = req.user
    const { name, description, price, img_url, order = 0 } = req.body

    try {
      await knex('items')
        .update({
          name,
          description,
          price,
          img_url,
          order
        })
        .where({ id, category_id, user_id })

      return res.status(200).send({
        success: true,
        message: 'item.update.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: true,
        message: 'item.update.nok'
      })
    }
  },

  // DELETE
  async delete(req, res) {
    const { category_id, id } = req.params
    const { id: user_id } = req.user

    try {
      await knex('items').where('id', id).del()

      return res.status(200).send({
        success: true,
        message: 'item.delete.ok'
      })
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: 'item.delete.nok'
      })
    }
  }
}
