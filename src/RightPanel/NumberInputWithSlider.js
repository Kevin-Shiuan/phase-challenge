import { forwardRef } from 'react';

import { PropEditLabel } from '../components/PropEditLabel';

const NumberInputWithSlider = forwardRef(
  ({ labelName, propertyKey, value = 0, min = 0, max = 100, handleChange }, ref) => 
      <PropEditLabel>
        {labelName}
        <input
          type="number"
          ref={ref}
          min={min}
          max={max}
          onBlur={(e) => handleChange({ key: propertyKey, value: (e.target.value / 100).toFixed(2) })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleChange({ key: propertyKey, value: (e.target.value / 100).toFixed(2) });
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={Math.round(value * 100)}
          onChange={(e) => handleChange({ key: propertyKey, value: (e.target.value / 100).toFixed(2) })}
        />
      </PropEditLabel>
);

NumberInputWithSlider.displayName = 'NumberInputWithSlider';

export default NumberInputWithSlider;
