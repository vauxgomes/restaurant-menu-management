exports.up = function (knex) {
  console.log('Migration: ITEMS')

  return knex.schema.createTable('items', function (table) {
    table.increments('id').primary()

    table.integer('category_id').notNullable()
    table.foreign('category_id').references('categories.id')

    table.string('name').notNullable()
    table.string('description').notNullable()
    table.double('price').notNullable()

    table.string('img_url')
    table.integer('order').notNullable().defaultTo(0)

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('items')
}
