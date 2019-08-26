import { Deck } from '../src/Deck'

describe('Deck', () => {
  describe('cards', () => {
    verify.it('should contain 52 cards', () => {
      const deck = new Deck()
      deck.cards.length.should.eql(52)
    })
  })
})
