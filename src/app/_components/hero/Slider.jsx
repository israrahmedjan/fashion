'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const slides = [
  {
    id: 1,
    image: '/images/banner/banner-1.jpg',
    title: 'The Choice Collection',
    subtitle: 'Explore the trendiest styles of the year',
  },
  {
    id: 2,
    image: '/images/banner/banner-2.jpg',
    title: 'Summer Arrivals',
    subtitle: 'Fresh looks for sunny days',
  },
  {
    id: 3,
    image: '/images/banner/banner-3.jpg',
    title: 'New Season Sale',
    subtitle: 'Up to 50% off select items',
  },
];

export default function FullWidthSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-400 hover:bg-[#ca1515]" />
    ),
    dotsClass: 'slick-dots custom-dots',
  };

  return (
   <section className="relative mt-20 w-full h-[20vh] md:h-[498px] overflow-hidden">
  <div className="relative h-full">
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <div
            className="w-full h-[20vh] md:h-[498px] bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="h-full w-full bg-[#111111]/0 flex items-center justify-center px-4">
              <div className="text-center text-white max-w-3xl">
                <h1 className="text-base md:text-[18px] text-[#cc1d1d] font-[400] uppercase mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p
                  className="text-base sm:text-lg font-cookie md:text-[80px] text-[#111111]"
                  style={{ lineHeight: '50px' }}
                >
                  {slide.subtitle}
                </p>
                <div className="flex justify-center cursor-pointer">
                  <h1 className="md:mt-10 text-[#111111] font-[700] text-sm md:text-[14px] md:w-[80px] border-[#cc1d1d] border-b-2">
                    Shop Now
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>

    {/* Dots style here */}
    <style jsx global>{`
      .custom-dots {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex !important;
        justify-content: center;
        align-items: center;
        gap: 0.75rem;
        width: auto;
        z-index: 10;
      }

      .custom-dots li {
        margin: 0;
      }

      .custom-dots li.slick-active div {
        background-color: #ca1515 !important;
        transform: scale(1.25);
      }
    `}</style>
  </div>
</section>

  );
}
