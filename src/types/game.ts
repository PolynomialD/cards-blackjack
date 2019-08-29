export type game = {
  readonly shoe: card[],
  readonly dealerCards: card[],
  readonly seats: seat[],
  readonly player: player
}

export type card = {
  readonly face: string,
  readonly value: number
}

export type seat = {
  readonly betAmount: number,
  readonly hands: hand[]
}

export type hand = {
  readonly id: number,
  readonly cards: card[],
  readonly bet: number
}

export type player = {
  readonly name: string,
  readonly chips: number
}