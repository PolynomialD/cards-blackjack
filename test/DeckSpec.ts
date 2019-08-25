const NewDeck = require('../src/Deck.ts')

describe('Deck', () => {
  it('should have a name', () => {
    const newdeck = new NewDeck('test')
    newdeck.name.should.eql('test')
  })
})
