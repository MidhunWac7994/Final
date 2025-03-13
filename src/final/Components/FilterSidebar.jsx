import React from "react";
import { Form } from "react-bootstrap";
import CustomSlider from "./CustomSlider";
const FilterSidebar = ({ 
  filters, 
  filterOptions, 
  handleFilterChange, 
  handleResetFilters 
}) => {
  return (
    <div className="sticky-top" style={{ top: "20px" }}>
      <h4>Filters</h4>
      
   
      <div className="mt-3">
        <h6>Brand</h6>
        <Form>
          {filterOptions?.find(f => f.label === "Brand")?.options?.map((brand) => (
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
          {filterOptions?.find(f => f.label === "Category")?.options?.map((category) => (
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
    {filterOptions?.find(f => f.label === "Model")?.options?.map((model_name) => (
      <Form.Check
        key={model_name.name}
        type="checkbox"
        label={model_name.name}
        checked={filters.models.includes(model_name.name)}
        onChange={() => handleFilterChange("models", model_name.name)}
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


      <button
        className="btn btn-outline-secondary mt-3 w-100"
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;