import { Game } from './game'

export function respond(req: any, res: any, next: any) {
  res.send('hello ' + req.params.name)
  next()
}

export async function newGame(req: any, res: any, next: any) {
  try {
    const player = req.body.player
    const game = await Game.newGame(player)
    res.send(game)
  } catch(err) {
    console.log(err)
    res.send(500)
  } finally {
    next()
  }
}

export async function dealCards(req: any, res: any, next: any) {
  try {
    const gameId = req.params.gameId
    const game = await Game.dealCards(gameId)
    res.send(game)
  } catch(err) {
    res.send(500)
  } finally {
    next()
  }
}

export async function placeBet(req: any, res: any, next: any) {
  try {
    const gameId = req.params.gameId
    const amount = Number(req.params.amount)
    const game = await Game.placeBet(gameId, amount)
    res.send(game)
  } catch(err) {
    res.send(500)
  } finally {
    next()
  }
}