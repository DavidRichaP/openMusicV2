const Jwt = require('@hapi/jwt')
const InvariantError = require('../exceptions/InvariantError')

const tokenManager = {
  generateAccesToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (payload) => {
  try {
    const artifacts = Jwt.token.decode(refreshToken)
    Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY)
    const { payload } = artifacts.decoded
    return payload
  } catch (error) {
    throw new InvariantError('Refresh token tidak valid')
    }
  }
}

module.exports = tokenManager
