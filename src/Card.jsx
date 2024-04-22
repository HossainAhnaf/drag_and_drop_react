import React ,{forwardRef} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const _Card = forwardRef(function _Card({className},ref) {
  return (
    <Card className={className} style={{ width: '18rem' }} ref={ref}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
})

export default _Card;