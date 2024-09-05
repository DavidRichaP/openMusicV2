const ClientError = require('../../exceptions/ClientError')
const autoBind = require("auto-bind")

class CollaborationsHandler {
  constructor(collaborationsService, playlistService, playlistSongService, validator) {
    this._collaborationsService = collaborationsService
    this._playlistService = playlistService
    this._playlistSongService = playlistSongService
    this._validator = validator

    autoBind(this)
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload)
    const { id: credentialId } = request.auth.credentials
    const { noteId, userId } = request.payload
    
    await this._playlistService.verifyPlaylistAccess(noteId, credentialId)

    const collaborationId = await this._collaborationsService.addCollaboration(noteId, userId)

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId
      }
    })
    response.code(201)
    return response
  }

  async deleteCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload)
    const { id: credentialId } = request.auth.credentials
    const { noteId, userId } = request.payload
    
    await this._playlistService.verifyPlaylistAccess(noteId, credentialId)
    await this._collaborationsService.deleteCollaboration(noteId, userId)

    return {
      status: 'success',
      message: 'Kolaborasi berhasil dihapus',
    }
  }
}

module.exports = CollaborationsHandler
