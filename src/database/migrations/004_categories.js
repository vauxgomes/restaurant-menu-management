exports.up = function (knex) {
  console.log('Migration: CATEGORIES')

  return knex.schema.createTable('categories', function (table) {
    table.increments('id').primary()

    table.integer('branch_id').notNullable()
    table.foreign('branch_id').references('branches.id')

    table.string('name').notNullable()
    table.integer('order').notNullable().defaultTo(0)

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('categories')
}