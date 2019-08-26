import { Deck } from '../src/Deck'
import { buildDeck, suit, value } from '../src/lib/deckBuilder'
import { Gen } from 'verify-it'

const suits: suit[] = ['clubs', 'diamonds', 'hearts', 'spades']
const values: value[] = [['2', 2],['3',3],['4', 4],['5', 5],['6', 6],['7', 7],['8', 8],['9', 9],['10', 10],['jack', 10],['queen', 10],['king', 10],['ace', 11]]

const generateSuits = (): suit => {
  return Gen.pick(suits)()
}

describe('Deck', () => {
  describe('cards', () => {
    verify.it('should contain 52 cards', Gen.array(generateSuits, 4), (suits) => {
      const cards = buildDeck(suits, values)
      const deck = new Deck(cards)
      deck.getNumberOfCards().should.eql(52)
    })
  })

  describe('dealCard', () => {
    verify.it('should return the top card', () => {
      const cards = buildDeck(suits, values)
      const deck = new Deck(cards)

      deck.dealCard().should.eql(cards[0])
    })
  })
})
