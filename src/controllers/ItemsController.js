const knex = require('../database')

// Controller
module.exports = {
  // Index
  async index(req, res) {
    const { category_id } = req.params
    const items = await knex.select().from('items').where({ category_id })

    return res.json(items)
  },

  // Create
  async create(req, res) {
    try {
      const { category_id } = req.params
      const { name, description, price, img_url, order = 0 } = req.body

      const [id] = await knex('items')
        .insert({
          name,
          description,
          price,
          img_url,
          order,
          category_id
        })
        .returning('id')

      return res.json(id)
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        success: false,
        message: 'item.create.nok'
      })
    }
  },

  // Update
  async update(req, res) {
    const { id, category_id } = req.params
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
        .where({ id, category_id })

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
    const { id, category_id } = req.params

    try {
      await knex('items').where({ id, category_id }).del()

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
