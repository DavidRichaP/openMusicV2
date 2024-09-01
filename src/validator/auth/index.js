const InvariantError = require('../../exceptions/InvariantError');
const { AuthPayloadSchema } = require('./schema');
 
const UserAuth = {
  validateUserAuth: (payload) => {
    const validationResult = AuthPayloadSchema.validate(payload);
 
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = UserAuth
