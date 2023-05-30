import { forwardRef } from 'react';

const NumberInputWithSlider = forwardRef(
  ({ labelName, propertyKey, value = 0, min = 0, max = 100, handleChange }, ref) => {
    return (
      <label className="grid grid-cols-[16px_3rem_minmax(0,_1fr)] gap-2 m-1">
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
      </label>
    );
  }
);

export default NumberInputWithSlider;
