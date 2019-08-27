import { seat, card, game, player } from '../types/game'
import { buildDeck } from '../lib/deckBuilder'

export class TestGame {
  private constructor (
    private readonly deck: card[] = buildDeck(),
    private readonly seats: seat[] = [],
    private readonly player: player = { id:777, name:'Testy', chips: 1000 }
  ) {}

  static create (): TestGame {
    return new TestGame()
  }

  withDeck (deck: card[]): TestGame {
    return new TestGame(deck, this.seats, this.player)
  }

  withSeats (seats: seat[]): TestGame {
    return new TestGame(this.deck, seats, this.player)
  }

  withPlayer (player: player): TestGame {
    return new TestGame(this.deck, this.seats, player)
  }

  build (): game {
    return {
      deck: this.deck,
      seats: this.seats,
      player: this.player
    }
  }
}
