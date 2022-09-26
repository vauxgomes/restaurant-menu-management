exports.up = function (knex) {
  console.log('Migration: ORDERS')

  return knex.schema.createTable('orders', function (table) {
    table.increments('id').primary()

    table.integer('branch_id').notNullable()
    table.foreign('branch_id').references('branches.id')

    table.string('name').notNullable()
    table.string('address').notNullable()
    table.string('contact').notNullable()
    table.string('note').notNullable()

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('orders')
}
