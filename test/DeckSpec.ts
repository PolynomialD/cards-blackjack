import { Deck } from '../src/Deck'
import { buildDeck } from '../src/lib/deckBuilder'

describe('Deck', () => {
  describe('cards', () => {
    verify.it('should contain 52 cards', () => {
      const cards = buildDeck()
      const deck = new Deck(cards)
      deck.getNumberOfCards().should.eql(52)
    })
  })

})
