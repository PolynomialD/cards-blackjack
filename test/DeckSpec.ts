import { Deck } from '../src/Deck'
import { buildDeck } from '../src/lib/deckBuilder'
import { TestGame } from './lib/TestGameBuilder'
import { game, card } from '../src/types/game'

describe('Deck', () => {
  describe('cards', () => {
    verify.it('should contain 52 cards', () => {
      const cards = buildDeck()
      const deck = new Deck(cards)

      deck.getNumberOfCards().should.eql(52)
    })
  })

  describe('dealCard()', () => {
    verify.it('should deal a card to a hand', () => {
      const initial: game = TestGame.create().build()
      const complete: game = Deck.dealCard(initial, 0)
      const expected: card = initial.deck[0]

      complete.seats[0].hands[0].cards[0].should.eql(expected)
    })
  })
})
