import React from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';

const SearchResults = ({ isLoading, error, items }) => {
  return (
    <>
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger">
          <Alert.Heading>Oops!</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      )}

      {!isLoading && !error && (
        <Row xs={1} md={4} className="g-4 mb-4">
          {items.length > 0 ? (
            items.map((item) => (
              <Col key={item.id}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={item.image_link}
                    alt={item.title}
                    className={`img-fluid rounded ${
                      item.attributes.availability === "Out of Stock"
                        ? "blur-image"
                        : ""
                    }`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text className="fw-bold">KWD: {item.sale_price}</Card.Text>
                    <Card.Text>
                      <small className="text-muted">{item.attributes.brand}</small>
                    </Card.Text>

                    <Card.Text>
                      <small className="text-muted">{item.discount}</small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <p className="lead">Results not found</p>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default SearchResults;
