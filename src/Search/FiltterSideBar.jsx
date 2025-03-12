import React from 'react';
import { Form } from 'react-bootstrap';

const FilterSidebar = ({ data, filters, handleFilterChange }) => {
  return (
    <div className="sticky-top" style={{ top: "20px" }}>
      <h4>Filters</h4>

      {/* Brand Filter */}
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

      {/* Category Filter */}
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

      {/* Model Filter */}
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
    </div>
  );
};

export default FilterSidebar;
