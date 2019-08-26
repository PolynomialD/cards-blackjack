export function buildDeck (suits: suit[], values: value[]): card[] {
  const cards: card[] = suits.reduce((output: card[], suit) => {
    const bob = values.map((value) => {
      return {
        face: `${value[0]} of ${suit}`,
        value: value[1]
      }
    })
    return [...output, ...bob]
  }, [])
  return cards
}

export type card = {
  readonly face: string,
  readonly value: number
}

export type suit = 'clubs' | 'diamonds' | 'hearts' | 'spades'

export type value = [string, number]
