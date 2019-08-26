import { card } from './lib/deckBuilder'

export class Deck {
  constructor (
    private readonly cards: card[]
  ) {}

  getNumberOfCards (): number {
    return this.cards.length
  }

  dealCard () {
    return this.cards[0]
  }
}
