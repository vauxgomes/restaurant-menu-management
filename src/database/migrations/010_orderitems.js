exports.up = function (knex) {
  console.log('Migration: ORDERSITEMS')

  return knex.schema.createTable('orderitems', function (table) {
    table.increments('id').primary()

    table.integer('order_id').notNullable()
    table.foreign('order_id').references('orders.id')

    table.integer('item_id').notNullable()
    table.foreign('item_id').references('items.id')

    table.double('price')

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('orderitems')
}
