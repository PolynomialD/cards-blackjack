import { Game } from '../src/game'
import { TestGame } from './lib/testGameBuilder'
import { game, card, seat } from '../src/types/gametypes'
import { buildShoe } from '../src/lib/shoeBuilder'
import { Gen } from 'verify-it'
import { MongoClient } from 'mongodb'

const url = `mongodb://root:example@localhost:27017`

const insert = async (data: any) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
  const collection = 'gamedata'
  try {
    await client.connect()
    const db = client.db('blackjack')
    await db.collection(collection).insertOne(data)
  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
}

const get = async (id: any) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
  const collection = 'gamedata'
  try {
    await client.connect()
    const db = client.db('blackjack')
    const game = await db.collection(collection).findOne({ id })
    return game
  } catch (err) {
    console.log(err.stack)
  } finally {
    await client.close()
  }
}

describe('Deck', () => {
  verify.it('should have the correct number of cards in deck', Gen.integerBetween(1, 9), (numberOfDecks) => {
    const shoe = buildShoe(numberOfDecks)
    const expected = 52 * numberOfDecks
    const game: game = TestGame.create()
      .withDeck(shoe)
      .build()

    game.shoe.length.should.eql(expected)
  })

  describe('placeBet()', () => {
    verify.it('should add a seat', Gen.string, async (gameId) => {
      const gameState: game = TestGame.create()
        .withId(gameId)
        .build()

      await insert(gameState)
      await Game.placeBet(gameId)
      const newGameState = await get(gameId) as game
      newGameState.seats.length.should.eql(1)
    })

    verify.it('should have the correct bet amount', Gen.string, Gen.integerBetween(200,2000), async (gameId, bet) => {
      const gameState: game = TestGame.create()
        .withId(gameId)
        .build()

      await insert(gameState)
      await Game.placeBet(gameId, bet)
      const newGameState = await get(gameId) as game
      newGameState.seats[0].betAmount.should.eql(bet)
    })
  })

  describe('dealCardToHand()', () => {
    verify.it('should deal a card to a hand', Gen.string, Gen.string, async (gameId, handId) => {
      const hand = { ...Game.makeHand([]), id: handId }
      const gameState: game = TestGame.create()
        .withId(gameId)
        .withSeats([{ betAmount: 0, hands: [Game.makeHand([]), hand] }])
        .build()
      const expectedCard: card = gameState.shoe[0]

      await insert(gameState)
      await Game.dealCardToHand(gameId, handId)
      const newGameState = await get(gameId) as game

      newGameState.seats[0].hands[1].cards[0].should.eql(expectedCard)
    })

    verify.it('should remove a card from the deck', Gen.string, Gen.string, async (gameId, handId) => {
      const hand = { ...Game.makeHand([]), id: handId }
      const gameState: game = TestGame.create()
        .withId(gameId)
        .withSeats([{ betAmount: 0, hands: [hand] }])
        .build()
      const expected = gameState.shoe.length - 1

      await insert(gameState)
      await Game.dealCardToHand(gameId, handId)
      const newGameState = await get(gameId) as game
      newGameState.shoe.length.should.eql(expected)
    })
  })

  function generateSeats (amount: number): seat[] {
    return new Array(amount).fill({
      id: Gen.string(),
      betAmount: 0,
      hands: []
    })
  }

  describe('dealCards()', () => {
    verify.it('should pass its betAmount to its hands', Gen.string, Gen.integerBetween(1000, 10000), async (gameId, bet) => {
      const gameState: game = TestGame.create()
        .withId(gameId)
        .build()

      await insert(gameState)
      await Game.placeBet(gameId, bet)
      await Game.dealCards(gameId)
      const newGameState = await get(gameId) as game
      newGameState.seats[0].hands[0].bet.should.eql(bet)
    })

    verify.it('should deal a hand with 2 cards to each seat', Gen.string, async (gameId) => {
      const seats = generateSeats(2)
      const gameState: game = TestGame.create()
        .withId(gameId)
        .withSeats(seats)
        .build()

      await insert(gameState)
      await Game.dealCards(gameId)
      const newGameState = await get(gameId) as game
      newGameState.seats.forEach((seat) => {
        seat.hands[0].cards.length.should.eql(2)
      })
    })

    verify.it('should leave all seats with 1 hand', Gen.string, async (gameId) => {
      const seats = generateSeats(2)
      const gameState: game = TestGame.create()
        .withId(gameId)
        .withSeats(seats)
        .build()

      await insert(gameState)
      await Game.dealCards(gameId)

      const newGameState = await get(gameId) as game

      newGameState.seats.forEach((seat) => {
        seat.hands.length.should.eql(1)
      })
    })

    verify.it('should deal the correct number of cards', Gen.string, async (gameId) => {
      const gameState: game = TestGame.create()
        .withId(gameId)
        .withSeats(generateSeats(1))
        .build()

      await insert(gameState)
      await Game.dealCards(gameId)

      const newGameState = await get(gameId) as game
      newGameState.shoe.length.should.eql(100)
    })

    verify.it('should give the dealer 2 cards', Gen.string, async (gameId) => {
      const gameState: game = TestGame.create().withId(gameId).build()
      await insert(gameState)
      await Game.dealCards(gameId)

      const newGameState = await get(gameId) as game

      newGameState.dealerCards.length.should.eql(2)
    })
  })

  describe('dealCardToDealer', () => {
    verify.it('should give the dealer another card', Gen.string, async (gameId) => {
      const gameState: game = TestGame.create().withId(gameId).build()

      await insert(gameState)
      await Game.dealCards(gameId)
      await Game.dealCardToDealer(gameId)

      const newGameState = await get(gameId) as game

      newGameState.dealerCards.length.should.eql(3)
    })
  })

  describe('evaluateHand', () => {
    verify.it('should check if a hand is splittable', Gen.integerBetween(1, 11), Gen.string, Gen.string, async (value, gameId, handId) => {
      const gameState: game = TestGame.create().withId(gameId).withSeats([{
        betAmount: 100,
        hands: [{
          id: handId,
          bet: 100,
          active: false,
          splittable: false,
          canDouble: false,
          canForfeit: false,
          isBust: false,
          isFinished: false,
          bust: false,
          cards: [{
            face: 'test',
            value
          },
          {
            face: 'test',
            value
          }]
    }]}]).build()

    await insert(gameState)
    await Game.evaluateHand(gameId, handId)

    const newGameState = await get(gameId) as game

    newGameState.seats[0].hands[0].splittable.should.eql(true)

    })
  })

})
