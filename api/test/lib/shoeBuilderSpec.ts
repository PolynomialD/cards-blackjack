import { buildDeck, shuffleDeck } from '../../src/lib/shoeBuilder'
import { card, suit, value } from '../../src/types/gametypes'
const suits: suit[] = ['clubs', 'diamonds', 'hearts', 'spades']
const values: value[] = [['2', 2],['3',3],['4', 4],['5', 5],['6', 6],['7', 7],['8', 8],['9', 9],['10', 10],['jack', 10],['queen', 10],['king', 10],['ace', 11]]

describe('shuffle()', () => {
  verify.it('should reorder the cards', () => {
    const original: card[] = buildDeck(suits, values)
    const shuffled: card[] = shuffleDeck(original)
    shuffled.should.not.eql(original)
  })
})
