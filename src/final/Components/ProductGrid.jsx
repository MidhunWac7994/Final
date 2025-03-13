import React from "react";
import { Row, Col, Card, Badge, Form } from "react-bootstrap";
import { Heart } from "react-bootstrap-icons";

const ProductGrid = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <Col className="text-center">
        <p className="lead">Results not found</p>
      </Col>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted small">
          Showing 1-{Math.min(items.length, 36)} of {items.length} for Mobile
        </span>
        <div className="d-flex align-items-center">
          <span className="me-2">Sort by:</span>
          <span className="fw-bold me-3">Relevance</span>
          <div className="view-toggle">
            <button className="btn btn-sm btn-outline-secondary active me-1">
              <i className="bi bi-grid"></i>
            </button>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </div>

      <Row xs={2} md={4} className="g-3 mb-4">
        {items.map((item) => (
          <Col key={item.id}>
            <Card className="h-100 product-card position-relative">
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={item.image_link}
                  alt={item.title}
                  className={`img-fluid ${
                    item.attributes.availability === "Out of Stock"
                      ? "opacity-75"
                      : ""
                  }`}
                  style={{ height: "200px", objectFit: "contain", padding: "10px" }}
                />
                <Heart 
                  className="position-absolute top-0 end-0 m-2 heart-icon"
                  size={20}
                  style={{ cursor: "pointer" }}
                />
                {item.attributes.availability === "Out of Stock" && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-0 m-2 px-2 py-1 sold-out-badge"
                  >
                    Sold Out!
                  </Badge>
                )}
              </div>
              <Card.Body className="p-2">
                <Card.Title className="fs-6 mb-1">{item.title}</Card.Title>
                <div className="d-flex flex-column">
                  <span className="fw-bold mb-1">
                    KWD {item.sale_price}
                  </span>
                  <div className="d-flex align-items-center">
                    <span className="text-muted text-decoration-line-through small me-2">
                      KWD {item.attributes.original_price}
                    </span>
                    <span className="text-success small">
                      {item.discount}off
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <Form.Check 
                    type="checkbox" 
                    id={`compare-${item.id}`}
                    label="Add to compare"
                    className="small"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductGrid;