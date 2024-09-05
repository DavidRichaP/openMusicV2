const playlistRoutes = (handler) => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt'
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.getPlaylistByIdHandler,
    options: {
      auth: 'openmusic_jwt'
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.,
    options: {
      auth: 'openmusic_jwt'
    },
  },
]

module.exports = playlistRoutes
