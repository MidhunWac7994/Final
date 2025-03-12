import React, { useState, useEffect } from "react";
import useSWR from "swr";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Pagination,
  Dropdown,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ReactSlider from "react-slider";
import { FaSearch } from 'react-icons/fa';

// CustomSlider component with unique keys for tracks and thumbs
const CustomSlider = ({ min, max, value, onChange, minDistance }) => {
  return (
    <ReactSlider
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      pearling
      minDistance={minDistance}
      renderTrack={(props, state) => {
        const { key, ...restProps } = props;
        return (
          <div
            key={`track-${state.index}`}
            {...restProps}
            style={{
              ...restProps.style,
              height: "8px",
              background: state.index === 1 ? "#007bff" : "#ddd",
              borderRadius: "4px",
            }}
          />
        );
      }}
      renderThumb={(props, state) => {
        const { key, ...restProps } = props;
        return (
          <div
            key={`thumb-${state.index}`}
            {...restProps}
            style={{
              ...restProps.style,
              height: "20px",
              width: "20px",
              backgroundColor: "#007bff",
              borderRadius: "50%",
              cursor: "grab",
              top: "-6px",
            }}
          />
        );
      }}
    />
  );
};

// Client configurations
const clientConfig = {
  english: {
    clientId: "7645129791",
    secretKey: "Qfj1UUkFItWfVFwWpJ65g0VfhjdVGN",
    indexName: "cv8mpreahlm7632gb530"
  },
  arabic: {
    clientId: "5807942863", 
    secretKey: "Llz5MR37gZ4gJULMwf762w1lQ13Iro",
    indexName: "qa-ar"
  }
};

const fetcher = async ([url, query, page, sortBy, filters, config]) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Client-id": config.clientId,
        "Secret-key": config.secretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: query,
        size: 28,
        sort_by: parseInt(sortBy),
        page: page,
        page_size: 28,
        filter: {
          category: filters.categories.length > 0 ? filters.categories : undefined,
          price: filters.priceRange,
          brand: filters.brands.length > 0 ? filters.brands : undefined,
          model: filters.models.length > 0 ? filters.models : undefined,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialQuery = new URLSearchParams(location.search).get("q") || "";

  const [currentPage, setCurrentPage] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam) : 1;
  });
  
  const initialClient = new URLSearchParams(location.search).get("client") || "english";
  const [selectedClient, setSelectedClient] = useState(initialClient);
  
  const [sortBy, setSortBy] = useState("1"); 
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    models: [], 
    priceRange: [0, 10000], 
  });
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const brands = searchParams.get("brands")?.split(",") || [];
    const categories = searchParams.get("categories")?.split(",") || [];
    const models = searchParams.get("models")?.split(",") || []; 
    const priceMin = parseInt(searchParams.get("priceMin")) || 0;
    const priceMax = parseInt(searchParams.get("priceMax")) || 10000;

    setFilters({
      brands,
      categories,
      models, 
      priceRange: [priceMin, priceMax],
    });
  }, [location.search]);


  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("q", searchQuery);
    searchParams.set("client", selectedClient);

    if (filters.brands.length > 0) {
      searchParams.set("brands", filters.brands.join(","));
    } else {
      searchParams.delete("brands");
    }

    if (filters.categories.length > 0) {
      searchParams.set("categories", filters.categories.join(","));
    } else {
      searchParams.delete("categories");
    }

    if (filters.models.length > 0) { 
      searchParams.set("models", filters.models.join(","));
    } else {
      searchParams.delete("models");
    }

    searchParams.set("priceMin", filters.priceRange[0].toString());
    searchParams.set("priceMax", filters.priceRange[1].toString());
    
    
    if (currentPage !== 1) {
      searchParams.set("page", currentPage.toString());
    } else {
      searchParams.delete("page");
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, [filters, searchQuery, currentPage, selectedClient, location.search, navigate]);

  const { data, error, isLoading } = useSWR(
    searchQuery
      ? [
          "https://uat.search-assist.webc.in/api/search",
          searchQuery,
          currentPage,
          sortBy,
          filters,
          clientConfig[selectedClient]
        ]
      : null,
    fetcher,
    { 
      revalidateOnFocus: false,
      onSuccess: (data) => {
        console.log("API response data:", data);
      },
      onError: (error) => {
        console.error("API error:", error);
      }
    }
  );

  const items = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / 28);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (type, value) => {
    if (type === "brands" || type === "categories" || type === "models") {
      setFilters({
        ...filters,
        [type]: filters[type].includes(value)
          ? filters[type].filter((item) => item !== value)
          : [...filters[type], value],
      });
    } else if (type === "priceRange") {
      setFilters({
        ...filters,
        priceRange: value,
      });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      brands: [],
      categories: [],
      models: [], 
      priceRange: [0, 10000],
    });
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}&client=${selectedClient}`);
    }
  };

  
  const sortOptions = [
    { value: "1", label: "Relevance" },
    { value: "2", label: "Price: Low to High" },
    { value: "3", label: "Price: High to Low" },
  ];

  const currentSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label || "Relevance";

  const paginationItems = () => {
    const items = [];
    const maxButtons = 5;
    const halfButtons = Math.floor(maxButtons / 2);

    let startPage = currentPage - halfButtons;
    let endPage = currentPage + halfButtons;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(startPage + maxButtons - 1, totalPages);
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxButtons + 1, 1);
    }

    if (startPage > 1) {
      items.push(
        <Pagination.Item
          key={1}
          active={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </Pagination.Item>
      );

      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key="ellipsis-start" />);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key="ellipsis-end" />);
      }

      items.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col md={{ span: 8, offset: 2 }}>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Search Results for: {searchQuery}</h1>

            <div className="d-flex align-items-center">
       
              <div className="d-flex align-items-center me-3">
                <span className="me-2">Language: </span>
                <Dropdown onSelect={(key) => setSelectedClient(key)}>
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

      <Row>

        <Col md={3}>
          <div className="sticky-top" style={{ top: "20px" }}>
            <h4>Filters</h4>
            
          
            <div className="mt-3">
              <h6>Brand</h6>
              <Form>
                {data?.filter_list?.find(f => f.label === "Brand")?.options?.map((brand) => (
                  <Form.Check
                    key={brand.name}
                    type="checkbox"
                    label={brand.name}
                    checked={filters.brands.includes(brand.name)}
                    onChange={() => handleFilterChange("brands", brand.name)}
                  />
                ))}
              </Form>
            </div>

          
            <div className="mt-3">
              <h6>Category</h6>
              <Form>
                {data?.filter_list?.find(f => f.label === "Category")?.options?.map((category) => (
                  <Form.Check
                    key={category.name}
                    type="checkbox"
                    label={category.name}
                    checked={filters.categories.includes(category.name)}
                    onChange={() => handleFilterChange("categories", category.name)}
                  />
                ))}
              </Form>
            </div>

          
            <div className="mt-3">
              <h6>Model</h6>
              <Form>
                {data?.filter_list?.find(f => f.label === "Model")?.options?.map((model) => (
                  <Form.Check
                    key={model.name}
                    type="checkbox"
                    label={model.name}
                    checked={filters.models.includes(model.name)}
                    onChange={() => handleFilterChange("models", model.name)}
                  />
                ))}
              </Form>
            </div>


            <div className="mt-3">
              <h6>Price Range</h6>
              <div className="d-flex align-items-center mb-2">
                <span>{filters.priceRange[0]}</span>
                <span className="mx-2">-</span>
                <span>{filters.priceRange[1]}</span>
              </div>
              <CustomSlider
                min={0}
                max={10000}
                value={filters.priceRange}
                onChange={(value) => handleFilterChange("priceRange", value)}
                minDistance={10}
              />
            </div>

            {/* Reset Filters Button */}
            <button
              className="btn btn-outline-secondary mt-3 w-100"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        </Col>

        {/* Search Results */}
        <Col md={{ span: 7, offset: 2 }}>
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
            <>
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
                          <Card.Text className="fw-bold">
                            KWD: {item.sale_price}
                          </Card.Text>
                          <Card.Text>
                            <small className="text-muted">
                              {item.attributes.brand}
                            </small>
                          </Card.Text>

                          <Card.Text>
                            <small className="text-muted">
                              {item.discount}
                            </small>
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

              <div className="d-flex justify-content-center">
                <Pagination>
                  {currentPage > 1 && (
                    <Pagination.Prev
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  )}

                  {paginationItems()}

                  {currentPage < totalPages && (
                    <Pagination.Next
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  )}
                </Pagination>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;