import { game, seat, card, hand, player } from './types/gametypes'
import * as mongoRepository from './lib/mongoRepository'
import { buildShoe } from '../src/lib/shoeBuilder'
const uuidv1 = require('uuid/v1')

type bob = {
  readonly seats: seat[],
  readonly shoe: card[]
}

export class Game {
  static async newGame (player: player, decks: number = 1) {
    const data: game = {
      id: uuidv1(),
      shoe: buildShoe(decks),
      dealerCards: [],
      seats: [],
      player
    }

    await mongoRepository.insert('gamedata', data)
  }

  static async placeBet (gameId: string, betAmount: number = 100) {
    const game = await mongoRepository.getGame(gameId) as game
    const newSeat = {
      id: uuidv1(),
      betAmount,
      hands: []
    }
    const seats = [...game.seats, newSeat]
    await mongoRepository.update('gamedata', { id: gameId }, { seats })
  }

  static async dealCards (gameId: string) {
    const game = await mongoRepository.getGame(gameId) as game
    const playerHands = this.dealHands(game.seats, game.shoe)
    const dealerCards = playerHands.shoe.splice(0, 2)
    await mongoRepository.update('gamedata', { id: gameId }, {
      dealerCards: dealerCards,
      seats: playerHands.seats,
      shoe: playerHands.shoe
    })
  }

  // to-do
  static async dealCardToHand (gameId: string, handId: string) {
    const game = await mongoRepository.getGame(gameId) as game

    const card: card = game.shoe[0]
    const shoe = game.shoe.slice(1)

    await mongoRepository.update('gamedata', { id: gameId }, {
      shoe,
      seats: this.giveHandCard(handId, card, game.seats)
    })
  }

  static async dealCardToDealer (gameId: string) {
    const game = await mongoRepository.getGame(gameId) as game
    const card: card = game.shoe[0]
    const shoe = game.shoe.slice(1)

    const data = {
      shoe,
      dealerCards: this.giveDealerCard(game.dealerCards, card)
    }

    await mongoRepository.update('gamedata', { id: gameId }, data)
  }

  static async evaluateHand (gameId: string, handId: string) {
    const game = await mongoRepository.getGame(gameId) as game

    const newSeats = game.seats.map((seat: seat) => {
      seat.hands.map((hand) => {
        if (hand.id === handId) {
          return this.makeHand(hand.cards, hand.bet, this.isSplittable(hand))
        } else return hand
      })
    })
    await mongoRepository.update('gamedata', { id: gameId }, newSeats)
  }

  static isSplittable (hand: hand) {
    return hand.cards.length === 2 && hand.cards[0].value === hand.cards[1].value
  }

  static makeHand (cards: card[], bet: number = 100, splittable: boolean = false): hand {
    return {
      id: uuidv1(),
      active: false,
      splittable,
      canDouble: true,
      canForfeit: false,
      isBust: false,
      isFinished: false,
      bet,
      bust: false,
      cards
    }
  }

  private static giveHandCard (handId: string, card: card, seats: seat[]): seat[] {
    return seats.map((seat) => {
      return {
        ...seat,
        hands: seat.hands.map((hand) => {
          if (hand.id === handId) {
            return {
              ...hand,
              cards: [...hand.cards, card]
            }
          }
          return hand
        })
      }
    })
  }

  private static giveDealerCard (dealerCards: card[], card: card): card[] {
    return [ ...dealerCards, card ]
  }

  private static dealHands (seats: seat[], shoe: card[]): bob {
    const newShoe = shoe.slice()
    const newSeats = seats.map((seat) => {
      const cards = newShoe.splice(0, 2)
      const hand = this.makeHand(cards, seat.betAmount)
      return { ...seat, hands: [ hand ] }
    })

    return {
      seats: newSeats,
      shoe: newShoe
    }
  }
}
