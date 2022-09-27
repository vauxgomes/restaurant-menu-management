const knex = require('../database')

const branchOwner = async (req, res, next) => {
  const { id: user_id } = req.user
  const { branch_id } = req.params

  const branch = await knex
    .select()
    .from('branches')
    .where({ user_id, id: branch_id })
    .first()

  if (!branch)
    return res.status(401).send({
      success: false,
      message: 'user.action.denied'
    })

  next()
}

const categoryOwner = async (req, res, next) => {
  const { id: user_id } = req.user
  const { branch_id, category_id } = req.params

  const category = await knex
    .select()
    .from('categories')
    .innerJoin('branches', 'categories.branch_id', 'branches.id')
    .where({
      'categories.id': category_id,
      branch_id,
      user_id
    })
    .first()

  if (!category)
    return res.status(401).send({
      success: false,
      message: 'user.action.denied'
    })

  next()
}

module.exports = { branchOwner, categoryOwner }
