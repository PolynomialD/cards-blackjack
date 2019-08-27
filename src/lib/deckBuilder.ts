export function buildDeck (): card[] {
  const suits: suit[] = ['clubs', 'diamonds', 'hearts', 'spades']
  const values: value[] = [['2', 2],['3',3],['4', 4],['5', 5],['6', 6],['7', 7],['8', 8],['9', 9],['10', 10],['jack', 10],['queen', 10],['king', 10],['ace', 11]]
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
