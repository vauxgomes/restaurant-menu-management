exports.up = function (knex) {
  console.log('Migration: USERS_BRANCHES')

  return knex.schema.createTable('users_branches', function (table) {
    table.increments('id').primary()

    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id')

    table.integer('branch_id').notNullable()
    table.foreign('branch_id').references('users.id')

    table.enu('role', ['OWNER', 'PARTNER'])

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users_branches')
}
