import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap'

type aCard = {
  face: string,
  value: number
}

export interface DealerProps {
  readonly cards: aCard[]
}

export class Dealer extends React.Component<DealerProps> {

  render () {
    return (
      <Container fluid>
        <Col xs={{ span: 4, offset: 4 }}>
        <Card style={{ width: '100%' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>Dealer</Card.Title>
              {
                this.props.cards.map((card: any) => {
                  return (
                    <Col>
                      <Image src={`/cards/${ card.image }.png`} fluid />
                    </Col>
                  )
                })
              })
            }
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
          </Card>
        </Col>
      </Container>
    )
  }
}