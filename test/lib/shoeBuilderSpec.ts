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

  // it('should not alter the length of the deck', () => {
  //   const deck = new Deck()
  //   const original = deck.size()
  //   deck.shuffle()
  //   deck.size().should.eql(original)
  // })

  // it('should contain valid cards after shuffling', () => {
  //   const validSuits = ['♣', '♦', '♥', '♠']
  //   const deck = new Deck()
  //   deck.shuffle()
  //   deck.cards.forEach((card) => {
  //     validSuits.includes(card.suit).should.eql(true)
  //   })
  // })
})
