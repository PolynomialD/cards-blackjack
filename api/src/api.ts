import { Game } from './game'

export function respond(req: any, res: any) {
  res.send('hello ' + req.params.name)
}

export async function newGame(req: any, res: any) {
  const player = req.body.player
  const game = await Game.newGame(player)
  res.send(game)
}

export async function dealCards(req: any, res: any) {
  const gameId = req.params.gameId
  const game = await Game.dealCards(gameId)
  res.send(game)
}

export async function placeBet(req: any, res: any) {
  const gameId = req.params.gameId
  const amount = Number(req.params.amount)
  const game = await Game.placeBet(gameId, amount)
  res.send(game)
}

export async function dealCardToHand(req: any, res: any) {
  const gameId = req.params.gameId
  const handId = req.params.handId
  const game = await Game.dealCardToHand(gameId, handId)
  res.send(game)
}