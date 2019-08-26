export class Deck {
  public cards: never[]
  constructor () {
    this.cards = this.buildCards()
  }

  buildCards () {
    const suits = [['clubs', '♣'], ['diamonds', '♦'], ['hearts', '♥'], ['spades', '♠']]
    const values = [['2', 2],['3',3],['4', 4],['5', 5],['6', 6],['7', 7],['8', 8],['9', 9],['10', 10],['jack', 10],['queen', 10],['king', 10],['ace', 11]]
    const cards = suits.map((suit) => {
      return values.map((value) => {
        return {
          faceValue: `${value[0]} + ${suit[1]}`,
          trueValue: value[1],
          // image: require(`../../assets/images/cards/${value[0]}_of_${suit[0]}.png`)
        }
      })
    })
    return [].concat.apply([], cards)
  }
}
