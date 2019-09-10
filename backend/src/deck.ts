import { game, seat, card, hand } from './types/gametypes'

type bob = {
  readonly seats: seat[],
  readonly shoe: card[]
}

export class Deck {
  static dealCardToHand (game: game, handId: number): game {
    const card: card = game.shoe[0]
    const shoe = game.shoe.slice(1)

    return {
      shoe,
      dealerCards: game.dealerCards,
      seats: this.giveHandCard(handId, card, game.seats),
      player: game.player
    }
  }

  static dealCardToDealer (game: game): game {
    const card: card = game.shoe[0]
    const shoe = game.shoe.slice(1)

    return {
      shoe,
      dealerCards: this.giveDealerCard(game.dealerCards, card),
      seats: game.seats,
      player: game.player
    }
  }

  static dealSeats (game: game): game {
    const playerHands = this.dealHands(game.seats, game.shoe)
    const dealerCards = playerHands.shoe.splice(0, 2)
    return {
      ...game,
      dealerCards: dealerCards,
      seats: playerHands.seats,
      shoe: playerHands.shoe
    }
  }

  private static giveHandCard (handId: number, card: card, seats: seat[]): seat[] {
    return seats.map((seat) => {
      return {
        betAmount: seat.betAmount,
        hands: seat.hands.map((hand) => {
          if (hand.id === handId) {
            return {
              id: hand.id,
              bet: hand.bet,
              bust: false,
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
      id: 11,
      bet: 100,
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
