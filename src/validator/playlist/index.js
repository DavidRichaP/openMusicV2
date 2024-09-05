const InvariantError = require('../../exceptions/InvariantError')
const {
  postPlaylistPayloadSchema,
  postPlaylistSongPayloadSchema
} = require('./schema')

const playlistValidator = {
  validatePlaylistPayload: (payload) => {
    const validationResult = postPlaylistPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },

  validateSongsPayload: (payload) => {
    const validationResult = postPlaylistSongPayloadSchema.validate(payload)

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}

module.exports = playlistValidator