import React from 'react';
import './App.css';
import axios from 'axios'
import { Container, Row, Col, Button } from 'react-bootstrap'

const server = 'http://localhost:8080'

class App extends React.Component {
  state: any = {
    message: '',
    game: false
  }

  constructor(props: any) {
    super(props);
    this.newGame = this.newGame.bind(this);
}

  componentDidMount() {
    axios.get(`${server}/hello/world`)
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

  render () {
    return (
      <Container className="App App-header">
        <Row>
          <Col>
            Message: { this.state.message }
          </Col>
        </Row>
        <Row>
          <Col>
           { this.state.game ? 'game' : <Button onClick={ this.newGame } variant="primary">New Game</Button>}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
