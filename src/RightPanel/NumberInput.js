import { forwardRef } from 'react';

const NumberInput = forwardRef(({ labelName, propertyKey, min = 0, max = 800, handleChange }, ref) => {
  return (
    <label className="grid grid-cols-[16px_3rem_minmax(0,_1fr)] gap-2 m-1">
      {labelName}
      <input
        type='number'
        ref={ref}
        min={min}
        max={max}
        defaultValue={0}
        onBlur={(e) => handleChange({ [propertyKey]: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleChange({ [propertyKey]: e.target.value });
        }}
      />
    </label>
  );
});

export default NumberInput;
