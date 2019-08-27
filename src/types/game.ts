export type game = {
  readonly deck: card[],
  readonly seats: seat[],
  readonly player: player
}

export type card = {
  readonly face: string,
  readonly value: number
}

export type player = {
  readonly id: number,
  readonly name: string,
  readonly chips: number,
}

export type bet = {
  readonly playerId: number,
  readonly amount: number
}

export type seat = {
  readonly bets: bet[],
  readonly hands: hand[]
}

export type hand = {
  readonly cards: card[]
}
