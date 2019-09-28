import { seat, card, game, player } from '../../src/types/gametypes'
import { buildShoe } from '../../src/lib/shoeBuilder'
import { Gen } from 'verify-it'

export class TestGame {
  private constructor (
    readonly id: string = Gen.string(),
    readonly shoe: card[] = buildShoe(2),
    readonly dealerCards: card[] = [],
    readonly seats: seat[] = [],
    readonly player: player = { name: Gen.word(), chips: Gen.integerBetween(1000, 10000)() }
  ) {}

  static create (): TestGame {
    return new TestGame()
  }

  withId (id: string): TestGame {
    return new TestGame(id, this.shoe, this.dealerCards, this.seats, this.player)
  }

  withDeck (shoe: card[]): TestGame {
    return new TestGame(this.id, shoe, this.dealerCards, this.seats, this.player)
  }

  withDealerCards (dealerCards: card[]): TestGame {
    return new TestGame(this.id, this.shoe, dealerCards, this.seats, this.player)
  }

  withSeats (seats: seat[]): TestGame {
    return new TestGame(this.id, this.shoe, this.dealerCards, seats, this.player)
  }

  withPlayer (player: player): TestGame {
    return new TestGame(this.id, this.shoe, this.dealerCards, this.seats, player)
  }

  build (): game {
    return {
      id: this.id,
      shoe: this.shoe,
      dealerCards: this.dealerCards,
      seats: this.seats,
      player: this.player
    }
  }
}
