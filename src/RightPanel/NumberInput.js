import { forwardRef } from 'react';

import { PropEditLabel } from '../components/PropEditLabel';

const NumberInput = forwardRef(({ labelName, propertyKey, min = 0, max = 800, handleChange }, ref) => (
  <PropEditLabel>
    {labelName}
    <input
      type="number"
      ref={ref}
      min={min}
      max={max}
      defaultValue={0}
      onBlur={(e) => handleChange({ [propertyKey]: e.target.value })}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleChange({ [propertyKey]: e.target.value });
      }}
    />
  </PropEditLabel>
));

NumberInput.displayName = 'NumberInput';

export default NumberInput;
