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
  readonly bust: boolean,
  readonly cards: card[],
  readonly bet: number
}

export type player = {
  readonly name: string,
  readonly chips: number
}

export type suit = 'clubs' | 'diamonds' | 'hearts' | 'spades'

export type value = [string, number]
