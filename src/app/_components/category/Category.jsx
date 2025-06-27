'use client';

import { ChevronRight, HomeIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox'; // ShadCN component
import { cn } from '@/lib/utils';
import PriceSlider from './PriceSlider';
import { productsByFilter } from './operationsApi';
import Products from './Products';
import LoadingSpinner from '../general/LoadingSpinner';

const sizes = ['Small', 'Medium', 'Large', 'XLarge'];
const color = ['Red', 'Blue', 'Green', 'Yellow', 'Black'];
const category = [
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Cosmetics', slug: 'cosmetics' },
  { name: 'Kid’s fashion', slug: 'kidz_fashion' },
  { name: 'Men’s fashion', slug: 'mens_fashion' },
  { name: 'Women’s fashion', slug: 'women_fashion' },
];

function Category({ slug }) {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColor, setselectedColor] = useState([]);
  const [selectCategory, setSelectedCategory] = useState([{ slug }]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState({
    miniMum: 20,
    maximum: 500,
  });
  const [filterData, setfilterData] = useState({
    size: [],
    color: [],
    price: priceRange,
    category: [],
  });

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const toggleMobileFilter = () => {
    setShowMobileFilter(!showMobileFilter);
  };

  const toggleCategory = (item) => {
    const exists = selectCategory.some((cat) => cat.slug === item.slug);
    if (exists) {
      setSelectedCategory((prev) => prev.filter((cat) => cat.slug !== item.slug));
    } else {
      setSelectedCategory((prev) => [...prev, item]);
    }
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setselectedColor((prev) =>
      prev.includes(color) ? prev.filter((s) => s !== color) : [...prev, color]
    );
  };

  const getProductsHandle = async (filter) => {
    setLoading(true);
    setProducts([]);
    const data = await productsByFilter(filter);
    setProducts(data);
    setLoading(false);
    console.log('Our Products', data);
  };

  useEffect(() => {
    const newFilter = {
      size: [...selectedSizes],
      color: [...selectedColor],
      price: { ...priceRange },
      category: [...selectCategory],
    };

    setfilterData(newFilter);

    const timer = setTimeout(() => {
      getProductsHandle(newFilter);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedSizes, selectedColor, priceRange, selectCategory]);

  return (
    <section>
      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 border-b">
        <span className="font-semibold text-lg">Filter</span>
        <button
          className="bg-[#ca1515] text-white px-3 py-1 rounded"
          onClick={toggleMobileFilter}
        >
          {showMobileFilter ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      <div className="flex flex-col w-full md:w-[1167px] mx-auto">
        <div className="flex text-base md:text-[15px] gap-2 items-center mt-4 md:mt-0 px-4 md:px-0">
          <HomeIcon size={20} />
          <span className="font-[500]">Home</span>
          <ChevronRight size={15} />
          <span>Kids Fashion</span>
        </div>

        <div className="flex flex-col md:flex-row mt-6 md:mt-12 gap-5 px-4 md:px-0">
          {/* Sidebar Filters */}
          <div
            className={cn(
              'w-full md:w-[25%]',
              showMobileFilter ? 'block' : 'hidden md:block'
            )}
          >
            {/* Category */}
            <div className="mb-5">
              <h1 className="text-[18px] font-semibold uppercase">Category</h1>
              <span className="block border-[#ca1515] border-b-2 w-[80px] mt-1"></span>

              <div className="space-y-4 mt-4">
                {category.map((size, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Checkbox
                      id={size.slug}
                      checked={selectCategory.some((item) => item.slug === size.slug)}
                      onCheckedChange={() => toggleCategory(size)}
                      className={cn(
                        'w-[12px] h-[12px] border-[1.5px] rounded-none text-[14px]',
                        selectCategory.some((item) => item.slug === size.slug)
                          ? 'border-[#ca1515] data-[state=checked]:text-[#ca1515] data-[state=checked]:bg-white'
                          : 'border-gray-400'
                      )}
                    />
                    <label htmlFor={size.slug} className="text-sm leading-none cursor-pointer">
                      {size.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-5 mb-5">
              <PriceSlider
                miniMum={priceRange.miniMum}
                maximum={priceRange.maximum}
                onPriceChange={(newRange) => setPriceRange(newRange)}
              />
              <div className="text-base md:text-[16px] mt-3">
                <span>
                  <strong className="font-semibold">Price:</strong> ${priceRange.miniMum}
                </span>
                <span> - ${priceRange.maximum}</span>
              </div>
            </div>

            {/* Size */}
            <div className="mt-5">
              <h1 className="text-[18px] font-semibold uppercase">Shop by size</h1>
              <span className="block border-[#ca1515] border-b-2 w-[80px] mt-1"></span>

              <div className="space-y-4 mt-4">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={size}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
                      className={cn(
                        'w-[12px] h-[12px] border-[1.5px] rounded-none text-[14px]',
                        selectedSizes.includes(size)
                          ? 'border-[#ca1515] data-[state=checked]:text-[#ca1515] data-[state=checked]:bg-white'
                          : 'border-gray-400'
                      )}
                    />
                    <label htmlFor={size} className="text-sm leading-none cursor-pointer">
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mt-10">
              <h1 className="text-[18px] font-semibold uppercase">Shop by Color</h1>
              <span className="block border-[#ca1515] border-b-2 w-[80px] mt-1"></span>

              <div className="space-y-4 mt-4">
                {color.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={color}
                      checked={selectedColor.includes(color)}
                      onCheckedChange={() => toggleColor(color)}
                      className={cn(
                        'w-[12px] h-[12px] border-[1.5px] rounded-none text-[14px]',
                        selectedColor.includes(color)
                          ? 'border-[#ca1515] data-[state=checked]:text-[#ca1515] data-[state=checked]:bg-white'
                          : 'border-gray-400'
                      )}
                    />
                    <label htmlFor={color} className="text-sm leading-none cursor-pointer">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Area */}
          <div className="w-full">
            {loading ? (
              <LoadingSpinner />
            ) : products && products.length > 0 ? (
              <Products items={products} />
            ) : (
              <div className="h-screen w-full flex items-center justify-center">
                <p className="border border-red-400 px-4 py-2 text-center text-red-500 rounded">
                  No Products Found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;
