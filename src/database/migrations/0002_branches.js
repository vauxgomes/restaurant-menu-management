exports.up = function (knex) {
  console.log('Migration: BRANCHES')

  return knex.schema.createTable('branches', function (table) {
    table.increments('id').primary()

    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id')

    table.string('name').notNullable()
    table.string('address').notNullable()
    table.string('img_url')

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('branches')
}
