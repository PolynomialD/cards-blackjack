import { game, seat, card } from './types/game'

export class Deck {
  static getCard (game: game, handId: number): game {
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
}
