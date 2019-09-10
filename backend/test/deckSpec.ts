import { Deck } from '../src/deck'
import { TestGame } from './lib/testGameBuilder'
import { game, card, seat } from '../src/types/gametypes'
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

  function generateSeats (amount: number): seat[] {
    return new Array(amount).fill({
      betAmount: 0,
      hands: []
    })
  }

  describe('dealCards()', () => {
    verify.it('should deal a hand with 2 cards to each seat', () => {
      const seats = generateSeats(2)
      const gameState: game = TestGame.create()
        .withSeats(seats)
        .build()
      const newGameState = Deck.dealSeats(gameState)

      newGameState.seats.forEach((seat) => {
        seat.hands[0].cards.length.should.eql(2)
      })
    })

    verify.it('should leave all seats with 1 hand', () => {
      const seats = generateSeats(2)
      const gameState: game = TestGame.create()
        .withSeats(seats)
        .build()
      const newGameState = Deck.dealSeats(gameState)

      newGameState.seats.forEach((seat) => {
        seat.hands.length.should.eql(1)
      })
    })

    verify.it('should deal the correct number of cards', () => {
      const gameState: game = TestGame.create()
        .withSeats(generateSeats(1))
        .build()
      const newGameState = Deck.dealSeats(gameState)
      newGameState.shoe.length.should.eql(100)
    })

    verify.it('should give the dealer 2 cards', () => {
      const gameState: game = TestGame.create().build()
      const newGameState = Deck.dealSeats(gameState)

      newGameState.dealerCards.length.should.eql(2)
    })
  })

  describe('dealCardToDealer', () => {
    verify.it('should give the dealer another card', () => {
      const gameState: game = TestGame.create().build()
      const newGameState = Deck.dealCardToDealer(Deck.dealSeats(gameState))

      newGameState.dealerCards.length.should.eql(3)
    })
  })

})
