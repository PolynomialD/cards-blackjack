import { card } from '../types/gametypes'

export function buildShoe (numberOfDecks: number): card[] {
  const suits: suit[] = ['clubs', 'diamonds', 'hearts', 'spades']
  const values: value[] = [['2', 2],['3',3],['4', 4],['5', 5],['6', 6],['7', 7],['8', 8],['9', 9],['10', 10],['jack', 10],['queen', 10],['king', 10],['ace', 11]]
  return new Array(numberOfDecks).fill(0).reduce((shoe) => {
    return shuffleDeck([...shoe, ...buildDeck(suits, values)])
  }, [])
}

function buildDeck (suits: suit[], values: value[]): card[] {
  return suits.reduce((output: card[], suit) => {
    const bob = values.map((value) => {
      return {
        face: `${value[0]} of ${suit}`,
        value: value[1]
      }
    })
    return [...output, ...bob]
  }, [])
}

function shuffleDeck (deck: card[]): card[] {
  const newDeck: card[] = deck.slice()
  newDeck.forEach((card, index) => {
    const randomIndex: number = Math.floor(Math.random() * (index + 1))
    const cardToSwap = card
    card = newDeck[randomIndex]
    newDeck[randomIndex] = cardToSwap
  })
  return newDeck
}

export type suit = 'clubs' | 'diamonds' | 'hearts' | 'spades'

export type value = [string, number]
