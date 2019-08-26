export type game = {
  readonly deck: card[],
  readonly seats: player[],
  readonly bets: bet[]
}

export type card = {
  readonly face: string,
  readonly value: number
}

export type player = {
  readonly id: number,
  readonly name: string,
  readonly chips: number,
  readonly betAmount: number
}

export type bet = {
  readonly playerId: number,
  readonly amount: number
}
