import { game, seat } from './types/gametypes'

export class Seat {
  static placeBet (game: game, seatNumber: number, bet: number): game {
    const newSeats: seat[] = game.seats.map((seat, index) => {
      if (seatNumber === index) {
        return {
          betAmount: bet,
          hands: seat.hands
        }
      } else {
        return seat
      }
    })
    return {
      id: game.id,
      shoe: game.shoe,
      dealerCards: game.dealerCards,
      seats: newSeats,
      player: game.player
    }
  }
}
