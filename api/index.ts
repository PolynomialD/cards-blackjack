import * as restify from 'restify'
import * as api from './src/api'

const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
  origins: ['http://localhost:3000']
})

const server = restify.createServer()
server.use(restify.plugins.bodyParser())
server.pre(cors.preflight)
server.use(cors.actual)

server.get('/hello/:name', api.respond)
server.post('/game/create', api.newGame)
server.get('/game/deal/:gameId', api.dealCards)
server.get('/game/placebet/:gameId/:amount', api.placeBet)

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})
