// hapi functionality
const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')

// core functionality
const albumService = require('./services/postgres/AlbumService')
const musicService = require('./services/postgres/SongService')
const songsValidator = require('../src/validator/songs')
const albumValidator = require('../src/validator/album')
const albums = require('./api/albums')
const songs = require('./api/songs')

// user
const UserService = require('./services/postgres/UserService')
const userValidator = require('./validator/users')
const users = require('./api/users')

// playlist

// auth
const auth = require('./api/auth')
const AuthService = require('./services/postgres/AuthService')
const tokenManager = require('./tokenize/TokenManager')
const authValidator = require('./validator/auth')

// collab
const collaborations = require('./api/collaborations')
const CollaborationsService = require('./services/postgres/CollabService')
const collaborationsValidator = require('./validator/collabs')

// error and env
const ClientError = require('./exceptions/ClientError')
require('dotenv').config()

const init = async () => {
	const openMusicSongs = new musicService()
	const openMusicAlbums = new albumService()
	const userService = new UserService()
	const authService = new AuthService()
	const collaborationService = new CollaborationsService()
	const server = Hapi.server({
		port: process.prod.env.PORT,
		host: process.prod.env.HOST,
		routes: {
			cors: {
				origin: ['*'],
			},
		},
	})

	// userauth
	await server.register([
		{
			plugin: users,
			options: {
				user: userService,
			},
			validator: {
				user: userValidator,
			},
		},
		{
			plugin: auth,
			options: {
				authService,
				userService,
				tokenManager: tokenManager,
				validator: authValidator
			}
		},
		{
			plugin: Jwt,
		},
	])

	// jwt strat
	server.auth.strategy('openmusic_jwt', 'jwt', {
		keys: process.env.ACCESS_TOKEN_KEY,
		verify: {
			aud: false,
			iss: false,
			sub: false,
			maxAgeSec: process.env.ACCESS_TOKEN_AGE,
		},
		validate: (artifacts) => ({
			isValid: true,
			credentials: {
				id: artifacts.decoded.payload.id,
			},
		})
	})

	// main functionality
	await server.register([
		{
			plugin: albums,
			options: {
				service: {
					album: openMusicAlbums,
				},
				validator: {
					album: albumValidator,
				},
			},
		},
		{
			plugin: songs,
			options: {
				service: {
					song: openMusicSongs,
				},
				validator: {
					song: songsValidator,
				},
			},
		},
		{
			plugin: collaborations,
			options: {
				service:{ 
					collaborationService,
					// playlistservice & playlistsong here
					validator: collaborationsValidator
				}
			}
		}
	])

	server.ext('onPreResponse', (request, h) => {

		const { response } = request;

		if (response instanceof ClientError) {
			const newResponse = h.response({
				status: 'fail',
				message: response.message,
			})
			newResponse.code(response.statusCode);
			return newResponse
		}

		return h.continue
	})

	await server.start()
	console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
