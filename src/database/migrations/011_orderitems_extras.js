exports.up = function (knex) {
  console.log('Migration: ORDERSITEMS_EXTRAS')

  return knex.schema.createTable('orderitems_extras', function (table) {
    table.increments('id').primary()

    table.integer('orderitem_id').notNullable()
    table.foreign('orderitem_id').references('orderitems.id')

    table.integer('extra_id').notNullable()
    table.foreign('extra_id').references('extras.id')

    table.double('price')

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('orderitems')
}
