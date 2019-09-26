import { game, seat, card, hand, player } from './types/gametypes'
import * as mongoRepository from './lib/mongoRepository'
import { buildShoe } from '../src/lib/shoeBuilder'
const uuidv1 = require('uuid/v1')

type bob = {
  readonly seats: seat[],
  readonly shoe: card[]
}

export class Game {
  static async newGame (player: player) {
    const id = uuidv1()
    const data: game = {
      id,
      shoe: buildShoe(8),
      dealerCards: [],
      seats: [],
      player
    }

    await mongoRepository.insert('gamedata', data)
    const game = await mongoRepository.get('gamedata', {id})
    return game
  }

  static async buySeat (gameId: string = 'b4d45730-e06e-11e9-bab8-91bdbc08dc6b') {
    const game = await mongoRepository.get('gamedata', {id: gameId})
    const newSeat = {
      id: uuidv1(),
      active: false,
      canSplit: false,
      canDouble: true,
      canForfeit: false,
      isBust: false,
      isFinished: false,
      bet: 100,
      cards: []
    }
    const seats = [...game[0].seats, newSeat]
    await mongoRepository.update('gamedata', {id: gameId}, {seats})
    console.log(game[0])
  }

  static async dealSeats (gameId: string = 'b4d45730-e06e-11e9-bab8-91bdbc08dc6b') {
    const game = await mongoRepository.get('gamedata', {id: gameId})
    const playerHands = this.dealHands(game[0].seats, game[0].shoe)
    const dealerCards = playerHands.shoe.splice(0, 2)
    await mongoRepository.update('gamedata', {id: gameId}, {
      dealerCards: dealerCards,
      seats: playerHands.seats,
      shoe: playerHands.shoe
    })
  }

  static async dealCardToHand (gameId: string = 'b4d45730-e06e-11e9-bab8-91bdbc08dc6b', handId: string = 'cc6a1da1-e076-11e9-b23b-bd8d73b16bd6') {
    const gameArray = await mongoRepository.get('gamedata', {id: gameId})
    const game = gameArray[0]

    const card: card = game.shoe[0]
    const shoe = game.shoe.slice(1)

    await mongoRepository.update('gamedata', {id: gameId}, {
      shoe,
      seats: this.giveHandCard(handId, card, game.seats),
    })
  }

  static dealCardToDealer (game: game): game {
    const card: card = game.shoe[0]
    const shoe = game.shoe.slice(1)

    return {
      id: '1',
      shoe,
      dealerCards: this.giveDealerCard(game.dealerCards, card),
      seats: game.seats,
      player: game.player
    }
  }

  private static giveHandCard (handId: string, card: card, seats: seat[]): seat[] {
    return seats.map((seat) => {
      return {
        betAmount: seat.betAmount,
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
    return [...dealerCards, card]
  }

  private static makeHand (cards: card[]): hand {
    return {
      id: uuidv1(),
      bet: 100,
      bust: false,
      cards
    }
  }

  private static dealHands (seats: seat[], shoe: card[]): bob {
    const newShoe = shoe.slice()
    const newSeats = seats.map((seat) => {
      const cards = newShoe.splice(0, 2)
      const hand = this.makeHand(cards)
      return { ...seat, hands: [hand] }
    })

    return {
      seats: newSeats,
      shoe: newShoe
    }
  }
}
