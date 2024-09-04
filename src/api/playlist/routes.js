const playlistRoutes = (handler) => { 
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.,
    options: {

    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: handler.,
    options: {

    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: handler.,
    options: {

    },
  },
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.,
    options: {

    },
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.,
    options: {

    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.,
    options: {

    },
  },
}
module.exports = playlistRoutes
