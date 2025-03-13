import React from 'react';

const BrandFilter = ({ 
  brands, 
  selectedBrands, 
  onToggleBrand 
}) => {
  return (
    <div>
      <h6>Brands</h6>
      {brands.map(brand => (
        <div key={brand}>
          <input
            type="checkbox"
            id={`brand-${brand}`}
            checked={selectedBrands.includes(brand)}
            onChange={() => onToggleBrand(brand)}
          />
          <label htmlFor={`brand-${brand}`}>{brand}</label>
        </div>
      ))}
    </div>
  );
};

export default React.memo(BrandFilter);

