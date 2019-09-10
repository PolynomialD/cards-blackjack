import { buildDeck, shuffleDeck } from '../../src/lib/shoeBuilder'
import { card } from '../../src/types/gametypes'

describe('shuffle()', () => {
  verify.it('should reorder the cards', () => {
    const original: card[] = buildDeck(1)
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
