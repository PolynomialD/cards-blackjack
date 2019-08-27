import { Deck } from '../src/Deck'
import { TestGame } from './lib/TestGameBuilder'
import { game, card } from '../src/types/game'

describe('Deck', () => {
  describe('getNumberOfCards', () => {
    verify.it('should get the number of cards in the deck', () => {
      const game: game = TestGame.create().build()

      Deck.getNumberOfCards(game).should.eql(52)
    })
  })

  describe('dealCard()', () => {
    verify.it('should deal a card to a hand', () => {
      const initial: game = TestGame.create().build()
      const complete: game = Deck.dealCard(initial, 0)
      const expected: card = initial.deck[0]

      complete.seats[0].hands[0].cards[0].should.eql(expected)
    })

    verify.it('should remove a card from the deck', () => {
      const initial: game = TestGame.create().build()
      const complete: game = Deck.dealCard(initial, 0)

      Deck.getNumberOfCards(complete).should.eql(51)
    })
  })
})
