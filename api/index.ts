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

server.get('/hello/:name', buildRequestHandler(api.respond))
server.post('/game/create', buildRequestHandler(api.newGame))
server.get('/game/deal/:gameId', buildRequestHandler(api.dealCards))
server.get('/game/placebet/:gameId/:amount', buildRequestHandler(api.placeBet))
server.get('/game/dealCardToHand/:gameId/:handId', buildRequestHandler(api.dealCardToHand))

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})

export function buildRequestHandler (func: Function) {
  return async (req: any, res: any, next: any) => {
    try {
      await func(req, res)
    } catch(err) {
      console.log(err)
      res.send(500)
    } finally {
      next()
    }
  }
}
