exports.up = function (knex) {
  console.log('Migration: ITEMS_EXTRAS')

  return knex.schema.createTable('items_extras', function (table) {
    table.increments('id').primary()

    table.integer('item_id').notNullable()
    table.foreign('item_id').references('items.id')

    table.integer('extra_id').notNullable()
    table.foreign('extra_id').references('extras.id')

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('extras')
}
