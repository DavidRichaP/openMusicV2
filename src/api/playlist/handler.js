const autoBind = require("auto-bind")

class playlistHandler{
  constructor(service, validator) {
    this._service = service.playlist
    this._validator = validator.playlist

    autoBind(this)
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload)

    const { name } = request.payload

    const playlist = await this._service.addPlaylist({ name })

    const response = h.response({
      status: 'success',
      message: 'Playlist sukses ditambahkan',
      data: {
        playlistId: playlist
      },
    })
    response.code(201)
    return response
  }

  async getPlaylistsHandler(request, h) {

  }
  
  async getPlaylistByIdHandler(request, h) {
    const { id } = request.params
    const { id: credentialId } = request.auth.credentials

    await this._service.verifyPlaylistAccess(id, credentialId)
    const playlist = await this._service // getplaylist
    
    return {
      status: 'success',
      data: {
        playlist,
      },
    }
  }

  async deletePlaylistByIdHandler(request, h) {

    const { id } = request.params
    await this._service.deletePlaylist(id)
    return {
      status: 'success',
      message: 'Playlist berhasil dihapus'
    }
  }

}

module.exports = playlistHandler
