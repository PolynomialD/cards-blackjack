import { Deck } from '../src/deck'
import { TestGame } from './lib/testGameBuilder'
import { game, card } from '../src/types/gametypes'
import { buildShoe } from '../src/lib/shoeBuilder'
import { Gen } from 'verify-it'

describe('Deck', () => {
  verify.it('should have the correct number of cards in deck', Gen.integerBetween(1, 9), (numberOfDecks) => {
    const shoe = buildShoe(numberOfDecks)
    const expected = 52 * numberOfDecks
    const game: game = TestGame.create()
      .withDeck(shoe)
      .build()

    game.shoe.length.should.eql(expected)
  })

  describe('dealCardToHand()', () => {
    verify.it('should deal a card to a hand', () => {
      const gameState: game = TestGame.create()
        .withSeats([{ betAmount: 0, hands: [{ id: 1233, bet: 0, cards: [] }, { id: 1234, bet: 0, cards: [] }] }])
        .build()
      const expectedCard: card = gameState.shoe[0]
      const newGameState = Deck.dealCardToHand(gameState, 1234)

      newGameState.seats[0].hands[1].cards[0].should.eql(expectedCard)
    })

    verify.it('should remove a card from the deck', () => {
      const gameState: game = TestGame.create()
        .withSeats([{ betAmount: 0, hands: [{ id: 1, bet: 0, cards: [] }] }])
        .build()
      const expected = gameState.shoe.length - 1

      Deck.dealCardToHand(gameState, 1).shoe.length.should.eql(expected)
    })
  })

  describe('dealCards()', () => {
    verify.it('should deal 2 cards to each hand', () => {
      const gameState: game = TestGame.create()
        .withSeats([{ betAmount: 0, hands: [{ id: 1, bet: 0, cards: [] } ] }, { betAmount: 0, hands: [{ id: 2, bet: 0, cards: [] } ] }])
        .build()
      const newGameState = Deck.dealCards(gameState)

      newGameState.seats[0].hands[0].cards.length.should.eql(2)
      newGameState.seats[1].hands[0].cards.length.should.eql(2)
    })
  })
})
