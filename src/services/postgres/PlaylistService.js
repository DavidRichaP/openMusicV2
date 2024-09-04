const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const autoBind = require('auto-bind')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class playlistService {
  constructor() {
    this._pool = new Pool()
    
    autoBind(this)
  }

  async addPlaylist({
    name, 
    owner
  }) {
    const { id } = `playlist-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO playlists VALUES ($1, $2, $3)',
      values: [id, name, owner],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new InvariantError('Failed to add Playlist')
    }

    return result.rows[0].id
  }

  async addSongToPlaylist() {
    const query = 

  }

  // under dev
  async getPlaylist(owner) {
    const query = {
      text: 'SELECT playlists.*, users.username FROM playlist LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id LEFT JOIN users ON playlists.owner = users.id WHERE playlists.owner = $1 OR collaborations.user_id = $1 GROUP BY playlists.id, users.username',
      values: [owner],
    }

    const result = await this._pool.query(query)

    const playlist = result.rows.map()[0]
    return playlist
    }

  // under dev
  async getPlaylistSongs(id) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1'
    }
  }

  async deletePlaylist(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Delete Failed')
    }
  }

  // needs perfecting
  async deletePlaylistSong(songId) {
    const query = {
      text: 'DELETE FROM playlists WHERE songId = $1 RETURNING id',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (!result.rowCount) {
      throw new NotFoundError('Delete Failed')
    }
  }
}

module.exports = playlistService
