import { ChevronRight, HomeIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'; // ShadCN component
import { cn } from '@/lib/utils'; // Utility for merging classes
import PriceSlider from './PriceSlider';
import { productsByFilter } from './operationsApi';
import Products from './Products';



const sizes = ['Small', 'Medium', 'Large', 'XLarge'];
const color = ['Red', 'Blue', 'Green', 'Yellow'];
const category = [
  {
    name: "Accessories",
    slug: "accessories"
  },
  {
    name: "Cosmetics",
    slug: "cosmetics"
  },
  {
    name: "Kid’s fashion",
    slug: "kidz_fashion"
  },
];

function Category({ slug }) {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColor, setselectedColor] = useState([]);
  const [selectCategory, setSelectedCategory] = useState([]);
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState({
    miniMum: 20,
    maximum: 500,
  });
  const [filterData, setfilterData] = useState({
    size: [],
    color: [],
    price: priceRange,
    category: [],
  })



  const toggleCategory = (size) => {
    setSelectedCategory((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setselectedColor((prev) =>
      prev.includes(color)
        ? prev.filter((s) => s !== color)
        : [...prev, color]
    );
  };

  const getProductsHandle = async (filter) => {
    setLoading(true);
    setProducts([]);
    const data = await productsByFilter(filter);
    setProducts(data);
    setLoading(false);
    console.log("Our Products",data)
  }
  //console.log(selectedSizes);
  useEffect(() => {
    console.log("Use effect is called!");

    const newFilter = {
      size: [...selectedSizes],
      color: [...selectedColor],
      price: { ...priceRange },
      category: [...selectCategory]
    };

    setfilterData(newFilter);        // state update
    const timer = setTimeout(() => {
      console.log("Called!");
      getProductsHandle(newFilter);
    }, 500);
    return () =>clearTimeout(timer)

    // API call with latest data
  }, [selectedSizes, selectedColor, priceRange, selectCategory]);
  return (
    <section>
      {/* Medium and large devices */}
      <div className='flex flex-col w-full md:w-[1167px]  mx-auto'>
        <div className=' '>
          <div className='flex text-base md:text-[15px] gap-2 items-center'><HomeIcon size={20} /><span> Shop  </span><ChevronRight size={15} /><span>Kids Fashion</span></div>

        </div>
        <div className='flex  mt-12 gap-5'>
          <div className='w-[25%] '>

            {/* Category */}
            <div className='mb-5'>
              <h1 className='text-[18px] font-semibold uppercase '>Category</h1>
              <span className='block border-[#ca1515] border-b-2 w-[80px] mt-1'></span>

              <div className="space-y-4 mt-4">
                {category.map((size, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Checkbox
                      id={size}
                      checked={selectCategory.includes(size)}
                      onCheckedChange={() => toggleCategory(size)}
                      className={cn(
                        'w-[12px] h-[12px] border-[1.5px] rounded-none text-[14px]', // ✔ icon size & scale
                        selectCategory.includes(size)
                          ? 'border-[#ca1515] data-[state=checked]:text-[#ca1515] data-[state=checked]:bg-white'
                          : 'border-gray-400'
                      )}
                    />
                    <label htmlFor={size} className="text-sm leading-none cursor-pointer">
                      {size.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className='mt-5 mb-5'>
              <PriceSlider
                miniMum={priceRange.miniMum}
                maximum={priceRange.maximum}
                onPriceChange={(newRange) => { console.log(newRange); setPriceRange(newRange) }}
              />
              <div className='text-base md:text-[16px] mt-3'><span><strong className='font-semibold'>Price:</strong> ${priceRange.miniMum}</span>
                <span> - ${priceRange.maximum}</span></div>

            </div>

            {/* Color */}
            <div>
              <h1 className='text-[18px] font-semibold uppercase '>Shop by size</h1>
              <span className='block border-[#ca1515] border-b-2 w-[80px] mt-1'></span>

              <div className="space-y-4 mt-4">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={size}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => toggleSize(size)}
                      className={cn(
                        'w-[12px] h-[12px] border-[1.5px] rounded-none text-[14px]', // ✔ icon size & scale
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

            {/* Size */}
            <div className='mt-10'>
              <h1 className='text-[18px] font-semibold uppercase '>Shop by Color</h1>
              <span className='block border-[#ca1515] border-b-2 w-[80px] mt-1'></span>

              <div className="space-y-4 mt-4">
                {color.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={color}
                      checked={selectedColor.includes(color)}
                      onCheckedChange={() => toggleColor(color)}
                      className={cn(
                        'w-[12px] h-[12px] border-[1.5px] rounded-none text-[14px]', // ✔ icon size & scale
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
          <div className='w-full'>
                  {loading && (  <div className="h-screen w-full flex items-center justify-center">
  <p className="px-4 py-2 text-center ">
   Loading..
  </p>
</div>)}
              {(products && products.length>0) ? (<Products items={products} />):(
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
  )
}

export default Category