const knex = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Controller
module.exports = {
  async register(req, res) {
    try {
      const { username, password } = req.body

      const user = await knex
        .select('id', 'password', 'role')
        .from('users')
        .where('username', username)
        .first()

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
            role: user.role
          },
          process.env.KEY
        )

        return res.json({
          success: true,
          message: 'user.login.ok',
          token
        })
      } else {
        return res.json({
          success: false,
          message: 'user.login.nok'
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        success: false,
        message: 'user.login.error'
      })
    }
  }
}
