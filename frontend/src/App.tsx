import React from 'react';
import './App.css';
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Dealer } from './Dealer'
import { Seat } from './Seat'

const server = 'http://localhost:8080'

class App extends React.Component {
  state: any = {
    message: '',
    game: false
  }

  constructor(props: any) {
    super(props);
    this.newGame = this.newGame.bind(this);
    this.dealCards = this.dealCards.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.getCard = this.getCard.bind(this);
  }

  componentDidMount() {
    axios.get(`${server}/hello/bob`)
      .then((response: any) => {
        console.log(response.data)
        const message = response.data
        this.setState({ message })
      })
      .catch(function (error: any) {
        // handle error
        console.log(error);
      })
  }

  async newGame() {
    const response = await axios.post(`${server}/game/create`, {
      player: {
        name: 'bob',
        chips: 1000
      }
    })
    const game = response.data
    this.setState((state) => {
      return {
        ...state,
        game
      }
    })
  }

  async dealCards() {
    const response = await axios.get(`${server}/game/deal/${ this.state.game.id }`)
    const game = response.data
    this.setState((state) => {
      return {
        ...state,
        game
      }
    })
  }

  async placeBet() {
    const response = await axios.get(`${server}/game/placebet/${ this.state.game.id }/3000`)
    const game = response.data
    this.setState((state) => {
      return {
        ...state,
        game
      }
    })
  }

  async getCard(handId: string) {
    const response = await axios.get(`${server}/game/dealCardToHand/${ this.state.game.id }/${handId}`)
    const game = response.data
    this.setState((state) => {
      return {
        ...state,
        game
      }
    })
  }

  render () {
    return (
      <Container className="App App-header" fluid>
        <Row>
          <Col>
            <Dealer cards={ this.state.game.dealerCards || [] }/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Seat seats={ this.state.game.seats || [] } getCard={ this.getCard }/>
          </Col>
        </Row>
        <Row>
          <Col>
           { !this.state.game ? <Button onClick={ this.newGame } variant="primary">New Game</Button> : <></>}
           { this.state.game ? <Button onClick={ this.dealCards }>Deal</Button> : <></>}
           { this.state.game ? <Button onClick={ this.placeBet }>Place Bet</Button> : <></>}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
