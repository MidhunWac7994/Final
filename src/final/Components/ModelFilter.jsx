import React from 'react';

const ModelFilter = ({ 
  models, 
  selectedModels, 
  onToggleModel 
}) => {
  return (
    <div>
      <h6>Models</h6>
      {models.map(model => (
        <div key={model}>
          <input
            type="checkbox"
            id={`model-${model}`}
            checked={selectedModels.includes(model)}
            onChange={() => onToggleModel(model)}
          />
          <label htmlFor={`model-${model}`}>{model}</label>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ModelFilter);