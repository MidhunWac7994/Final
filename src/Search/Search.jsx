import React from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import useSearch from "../final/hooks/useSearch";
import SearchHeader from "../final/Components/SearchHeader";
import FilterSidebar from "../final/Components/FilterSidebar";
import ProductGrid from "../final/Components/ProductGrid";
import PaginationControl from "../final/Components/PaginationControl";


const Search= () => {
  const {
    searchQuery,
    selectedClient,
    currentPage,
    sortBy,
    filters,
    data,
    error,
    isLoading,
    setSearchQuery,
    handleFilterChange,
    handleResetFilters,
    handlePageChange,
    handleSortChange,
    handleSearch,
    handleLanguageChange
  } = useSearch();

  const items = data?.items || [];
  const totalItems = data?.total || 0;
  const totalPages = Math.ceil(totalItems / 28);
  const filterOptions = data?.filter_list || [];

  return (
    <Container className="mt-4">
      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        selectedClient={selectedClient}
        handleLanguageChange={handleLanguageChange}
        sortBy={sortBy}
        handleSortChange={handleSortChange}
      />

      <Row>
        <Col md={3}>
          <FilterSidebar
            filters={filters}
            filterOptions={filterOptions}
            handleFilterChange={handleFilterChange}
            handleResetFilters={handleResetFilters}
          />
        </Col>

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
              <ProductGrid items={items} />
              
              {items.length > 0 && (
                <PaginationControl
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Search;



