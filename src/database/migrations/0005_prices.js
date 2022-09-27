exports.up = function (knex) {
  console.log('Migration: PRICES')

  return knex.schema.createTable('prices', function (table) {
    table.increments('id').primary()

    table.integer('item_id').notNullable()
    table.foreign('item_id').references('items.id')

    table.string('name').notNullable()
    table.string('description').notNullable()

    table.integer('order').notNullable().defaultTo(0)

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('prices')
}
