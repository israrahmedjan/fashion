import React from 'react';

const data = {
  "Hot Trend": [
    {
      title: "Chain bucket bag",
      price: "$59.0",
      image: "/images/trend/ht-1.jpg",
    },
    {
      title: "Pendant earrings",
      price: "$59.0",
      image: "/images/trend/ht-2.jpg",
    },
    {
      title: "Cotton T-Shirt",
      price: "$59.0",
     image: "/images/trend/ht-3.jpg",
    },
  ],
  "Best Seller": [
    {
      title: "Cotton T-Shirt",
      price: "$59.0",
      image: "/images/trend/bs-1.jpg",
    },
    {
      title: "Zip-pockets pebbled tote briefcase",
      price: "$59.0",
      image: "/images/trend/bs-2.jpg",
    },
    {
      title: "Round leather bag",
      price: "$59.0",
      image: "/images/trend/bs-3.jpg",
    },
  ],
  "Feature": [
    {
      title: "Bow wrap skirt",
      price: "$59.0",
      image: "/images/trend/f-1.jpg",
    },
    {
      title: "Metallic earrings",
      price: "$59.0",
      image: "/images/trend/f-2.jpg",
    },
    {
      title: "Flap cross-body bag",
      price: "$59.0",
      image: "/images/trend/f-3.jpg",
    },
  ],
};

const Featured = () => {
  return (
    <section className='w-full mt-[150px]'>
    <div className='w-full px-4 sm:px-6 md:px-0 md:w-[1167px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10'>
    {Object.entries(data).map(([category, items], index) => (
          <div key={index} className=''>
          <div className="inline-block">
  <h3 className='text-[#111111] text-base md:text-[20px] font-[600] mb-1'>
              {category === 'Hot Trend' ? (
                <>
                  HOT <span className=' px-1'>TREND</span>
                </>
              ) : (
                category.toUpperCase()
              )}
           </h3>
  <div className='w-16 h-[2px] bg-[#ca1515] mb-10'></div>
</div>
            <div className='space-y-6'>
              {items.map((item, i) => (
                <div key={i} className='flex items-start gap-4'>
                  <img src={item.image} alt={item.title} className='w-[90px] h-[90px] object-cover pt-1' />
                  <div className=''>
                    <p className='text-base md:text-[14px] font-[400]'>{item.title}</p>
                    <div className='text-yellow-400 text-sm'>★★★★★</div>
                    <p className='font-[600] text-[16px]'>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Featured;
