export class Deck {
  readonly cards: object[]
  constructor () {
    this.cards = this.buildCards()
  }

  buildCards () {
    const suits = ['clubs', 'diamonds', 'hearts', 'spades']
    const values = [['2', 2],['3',3],['4', 4],['5', 5],['6', 6],['7', 7],['8', 8],['9', 9],['10', 10],['jack', 10],['queen', 10],['king', 10],['ace', 11]]
    const cards: cards = suits.map((suit) => {
      return values.map((value) => {
        return {
          face: `${value[0]} of ${suit}`,
          value: value[1]
          // image: `../../assets/images/cards/${value[0]}_of_${suit}.png`
        }
      })
    })
    return [].concat.apply([], cards)
  }
}

type cards = {
  readonly face: string,
  readonly value: string | number
}[][]
