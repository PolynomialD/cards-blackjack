import { card } from './lib/deckBuilder'
import { game } from './types/game'

export class Deck {
  constructor (
    public readonly deck: card[]
  ) {}

  getNumberOfCards (): number {
    return this.deck.length
  }

  dealCard (game: game, seatNumber: number): game {
    const card: card = game.deck[0]
    game.seats[seatNumber].hands[0].cards.push(card)
    game.deck.pop()
    return game
  }
}
