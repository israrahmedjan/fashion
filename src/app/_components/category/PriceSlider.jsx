'use client';

import { useEffect, useState } from 'react';

export default function PriceSlider({miniMum,maximum,onPriceChange}) {
  const [minPrice, setMinPrice] = useState(miniMum);
  const [maxPrice, setMaxPrice] = useState(maximum);
  const [client, setClient] = useState(false);

  const min = 0;
  const max = 1000;
  const step = 10;

  useEffect(() => {
    setClient(true);
  }, []);


  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice - step) setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice + step) setMaxPrice(value);
  };

  const rangeStyle = {
    left: `${((minPrice - min) / (max - min)) * 100}%`,
    right: `${100 - ((maxPrice - min) / (max - min)) * 100}%`,
  };

    useEffect(() => {
    // Update parent whenever internal state changes
    onPriceChange({ miniMum: minPrice, maximum: maxPrice });
  }, [minPrice, maxPrice]);

  if (!client) return null;
  return (
    <div className="w-full max-w-sm space-y-2">
       <h1 className='text-[18px] font-semibold uppercase '>Filter by Price</h1>
              <span className='block border-[#ca1515] border-b-2 w-[80px] mt-0'></span>


      <div className="relative h-6 top-3 w-[80%]">
        {/* Track */}
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-gray-200" />

        {/* Range Highlight */}
        <div
          className="absolute top-1/2 h-1 bg-[#ca1515] -translate-y-1/2 rounded"
          style={rangeStyle}
        />

        {/* Min Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minPrice}
          onChange={handleMinChange}
          className="absolute w-[full] pointer-events-none accent-[#ca1515] h-1 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500"
        />

        {/* Max Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxPrice}
          onChange={handleMaxChange}
          className="absolute w-full pointer-events-none accent-[#ca1515] h-1 appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500"
        />
      </div>

      {/* <div className="flex justify-between text-sm text-gray-700">
        <span>Min: ${minPrice}</span>
        <span>Max: ${maxPrice}</span>
      </div> */}
    </div>
  );
}
