const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.json({
      success: false,
      message: 'user.authentication.required'
    })
  }

  try {
    // Decriptando o token e salvando dentro do objeto da requisição
    req.user = jwt.verify(authorization, process.env.KEY)
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: 'user.authentication.fail'
    })
  }

  next() // Chamando o próximo middleware
}
