exports.up = function (knex) {
  console.log('Migration: EXTRAS')

  return knex.schema.createTable('extras', function (table) {
    table.increments('id').primary()

    table.integer('branch_id').notNullable()
    table.foreign('branch_id').references('branches.id')

    table.string('name').notNullable()
    table.double('price').notNullable()

    table.string('img_url')

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('extras')
}
