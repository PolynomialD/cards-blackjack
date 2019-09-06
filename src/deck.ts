import { game, seat, card } from './types/gametypes'

export class Deck {
  static dealCardToHand (game: game, handId: number): game {
    const card: card = game.shoe[0]
    if (!card) {
      throw new Error('no cards in deck')
    }
    const shoe = game.shoe.slice(1)

    return {
      shoe,
      dealerCards: game.dealerCards,
      seats: this.giveHandCard(handId, card, game.seats),
      player: game.player
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
              cards: [...hand.cards, card]
            }
          }
          return hand
        })
      }
    })
  }

  static dealCardToDealer (game: game): game {
    const card: card = game.shoe[0]
    if (!card) {
      throw new Error('no cards in deck')
    }
    const shoe = game.shoe.slice(1)

    return {
      shoe,
      dealerCards: this.giveDealerCard(game.dealerCards, card),
      seats: game.seats,
      player: game.player
    }
  }

  private static giveDealerCard (dealerCards: card[], card: card): card[] {
    return [...dealerCards, card]
  }

  static dealCards (game: game): game {
    const shoe = game.shoe.slice(game.seats.length * 2)
    const seats = game.seats.map((seat, index) => {
      const cardOne = game.shoe[index]
      const cardTwo = game.shoe[game.seats.length + index]
      return {
        betAmount: seat.betAmount,
        hands: seat.hands.map((hand) => {
          return {
            id: hand.id,
            bet: hand.bet,
            cards: [cardOne, cardTwo]
          }
        })
      }
    })
    return {
      shoe,
      dealerCards: game.dealerCards,
      seats: seats,
      player: game.player
    }
  }
}
