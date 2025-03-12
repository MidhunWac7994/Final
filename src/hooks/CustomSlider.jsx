import React from 'react';
import ReactSlider from 'react-slider';

// Custom styles for the track and thumb
const trackStyle = (state) => ({
  height: "8px",
  background: state.index === 1 ? "#007bff" : "#ddd",
  borderRadius: "4px",
});

const thumbStyle = {
  height: "20px",
  width: "20px",
  backgroundColor: "#007bff",
  borderRadius: "50%",
  cursor: "grab",
  top: "-6px",
};

// CustomSlider component
const CustomSlider = ({ min, max, value, onChange, minDistance }) => {
  return (
    <ReactSlider
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      pearling
      minDistance={minDistance}
      renderTrack={(props, state) => (
        <div
          {...props}
          style={{
            ...props.style,
            ...trackStyle(state),
          }}
        />
      )}
      renderThumb={(props, state) => (
        <div
          {...props}
          style={{
            ...props.style,
            ...thumbStyle,
          }}
        />
      )}
    />
  );
};

export default CustomSlider;
