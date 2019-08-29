import { seat, card, game, player } from '../../src/types/game'
import { buildShoe } from '../../src/lib/shoeBuilder'
import { Gen } from 'verify-it'

export class TestGame {
  private constructor (
    private readonly shoe: card[] = buildShoe(2),
    private readonly dealerCards: card[] = [],
    private readonly seats: seat[] = [],
    private readonly player: player = { name: Gen.word(), chips: Gen.integerBetween(1000, 10000)() }
  ) {}

  static create (): TestGame {
    return new TestGame()
  }

  withDeck (shoe: card[]): TestGame {
    return new TestGame(shoe, this.dealerCards, this.seats, this.player)
  }

  withDealerCards (dealerCards: card[]): TestGame {
    return new TestGame(this.shoe, dealerCards, this.seats, this.player)
  }

  withSeats (seats: seat[]): TestGame {
    return new TestGame(this.shoe, this.dealerCards, seats, this.player)
  }

  withPlayer (player: player): TestGame {
    return new TestGame(this.shoe, this.dealerCards, this.seats, player)
  }

  build (): game {
    return {
      shoe: this.shoe,
      dealerCards: this.dealerCards,
      seats: this.seats,
      player: this.player
    }
  }
}
