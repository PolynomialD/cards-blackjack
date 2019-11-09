import React from 'react';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap'

// type Card = {
//   face: string,
//   value: number
// }

export interface SeatProps {
  readonly seats: any[],
  getCard: Function
}

export class Seat extends React.Component<SeatProps> {

  render () {
    console.log(this.props.seats[0])
    return (
      <Container fluid>
        <Row>
          {
            this.props.seats.map((seat: any) => {
              return (
                <Col xs={2}>
                  <Card>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>{ seat.betAmount }</Card.Title>
                    {
                    seat.hands.map((hand: any) => {
                      return (
                        <>
                          <Row>
                            { 
                              hand.cards.map((card: any) => {
                                return (
                                  <Col>
                                    <Image src={`/cards/${ card.image }.png`} fluid />
                                  </Col>
                                )
                              })
                            }
                          </Row>
                          <Row>
                            <Col>
                              { !hand.isBust ? <Button variant="success" onClick={() => { this.props.getCard(hand.id) }}>Card</Button> : <></>}
                              { hand.splittable ? <Button variant="primary">Split</Button> : <></>}
                              { hand.canDouble ? <Button variant="primary">Double</Button> : <></>}
                              { hand.canForfeit ? <Button variant="danger">Forfeit</Button> : <></>}

                            </Col>
                          </Row>
                        </>
                      )
                    })
                  }
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    )
  }
}