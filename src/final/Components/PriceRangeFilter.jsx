import React from 'react';

const PriceRangeFilter = ({ 
  priceRange, 
  onPriceRangeChange 
}) => {
  return (
    <div>
      <h6>Price Range</h6>
      <input
        type="range"
        min={priceRange[0]}
        max={priceRange[1]}
        value={priceRange}
        onChange={(e) => onPriceRangeChange(e.target.value)}
      />
    </div>
  );
};

export default React.memo(PriceRangeFilter);