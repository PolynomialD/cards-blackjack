import { Seat } from '../src/seat'
import { TestGame } from './lib/testGameBuilder'
import { game } from '../src/types/gametypes'

describe('Seat', () => {
  describe('placeBet()', () => {
    verify.it('should add a bet to a seat', () => {
      const game: game = TestGame.create()
      .withSeats([{ betAmount: 0, hands: [{ id: 1233, bet: 0, cards: [] }, { id: 1234, bet: 0, cards: [] }] }])
      .build()
      const newGame: game = Seat.placeBet(game, 0, 500)

      newGame.seats[0].betAmount.should.eql(500)
    })
  })
})
