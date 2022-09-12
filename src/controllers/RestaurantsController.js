const knex = require('../database')

// Controller
module.exports = {
  // Show
  async show(req, res) {
    const { id } = req.params

    let categories = await knex
      .select(
        // Categories
        'categories.id',
        'categories.name',
        'categories.order',
        'categories.user_id',
        'categories.order',
        // Items
        'items.id as item_id',
        'items.name as item_name',
        'items.description',
        'items.price',
        'items.img_url',
        'items.order as item_order'
      )
      .from('categories')
      .innerJoin('items', 'categories.id', 'items.category_id')
      .where('categories.user_id', id)
      .orderBy(
        'categories.order',
        'asc',
        'categories.id',
        'asc',
        'categories.item_order',
        'asc'
      )

    // Groupping by Category
    categories = categories.reduce((list, category) => {
      if (!list.length || list[list.length - 1].id !== category.id) {
        const category_ = {
          id: category.id,
          name: category.name,
          user_id: category.user_id,
          order: category.order,
          items: []
        }

        list.push(category_)
      }

      const lastCategory = list[list.length - 1]
      lastCategory.items.push({
        id: category.item_id,
        name: category.item_name,
        description: category.description,
        price: category.price,
        img_url: category.img_url,
        order: category.item_order
      })

      return list
    }, [])

    return res.send(categories)
  }
}
