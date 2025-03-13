import React from "react";
import { Row, Col, Dropdown, Form, InputGroup, Button } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';

const SearchHeader = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  selectedClient,
  handleLanguageChange,
  sortBy,
  handleSortChange
}) => {
  const sortOptions = [
    { value: "1", label: "Relevance" },
    { value: "2", label: "Price: Low to High" },
    { value: "3", label: "Price: High to Low" },
  ];

  const currentSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label || "Relevance";

  return (
    <>
      <Row className="mb-4">
        <Col md={{ span: 8, offset: 2 }}>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Search Results for: {searchQuery}</h1>

            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center me-3">
                <span className="me-2">Language: </span>
                <Dropdown onSelect={(key) => handleLanguageChange(key)}>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    id="dropdown-language"
                    className="d-flex align-items-center"
                  >
                    {selectedClient === "english" ? "English" : "Arabic"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="english">English</Dropdown.Item>
                    <Dropdown.Item eventKey="arabic">Arabic</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <span className="me-2">Sort by : </span>
              <Dropdown onSelect={handleSortChange}>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  id="dropdown-sort"
                  className="d-flex align-items-center"
                >
                  {currentSortLabel}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {sortOptions.map((option) => (
                    <Dropdown.Item key={option.value} eventKey={option.value}>
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSearch}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                aria-label="Search for products"
                className="py-2"
              />
              <Button variant="primary" type="submit">
                <FaSearch /> Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SearchHeader;