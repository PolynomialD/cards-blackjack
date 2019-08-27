import { card } from './lib/deckBuilder'
import { game } from './types/game'

export class Deck {

  static getNumberOfCards (game: game): number {
    return game.deck.length
  }

  static dealCard (game: game, seatNumber: number): game {
    const card: card = game.deck[0]
    game.seats[seatNumber].hands[0].cards.push(card)
    game.deck.pop()
    return game
  }
}
