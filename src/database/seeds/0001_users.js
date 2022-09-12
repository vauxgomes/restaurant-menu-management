const bcrypt = require('bcrypt')
const { roles } = require('../../middlewares/roles')

exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users').insert({
    name: 'Root',
    username: 'root',
    password: bcrypt.hashSync('12345', Number(process.env.SALT)),
    role: roles.ROOT
  })

  for (let i = 1; i <= 10; i++) {
    await knex('users').insert({
      name: `User ${i}`,
      username: `user_${i}`,
      password: bcrypt.hashSync('12345', Number(process.env.SALT)),
      role: roles.USER
    })
  }
}
