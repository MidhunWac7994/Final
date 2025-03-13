import React from 'react';

const CategoryFilter = ({ 
  categories, 
  selectedCategories, 
  onToggleCategory 
}) => {
  return (
    <div>
      <h6>Categories</h6>
      {categories.map(category => (
        <div key={category}>
          <input
            type="checkbox"
            id={`category-${category}`}
            checked={selectedCategories.includes(category)}
            onChange={() => onToggleCategory(category)}
          />
          <label htmlFor={`category-${category}`}>{category}</label>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CategoryFilter);
