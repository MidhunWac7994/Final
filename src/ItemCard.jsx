// components/ItemCard.js
import React from "react";
import { Card } from "react-bootstrap";

const ItemCard = ({ item }) => {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={item.image_link}
        alt={item.title}
        className="img-fluid rounded"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text className="fw-bold">Price: {item.sale_price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
