import { FaShippingFast, FaUndoAlt, FaLifeRing, FaLock } from "react-icons/fa";
import { CarFront,Banknote,CircleDotDashed,Headphones    } from 'lucide-react';

const shippingData = [
  {
    icon: <CarFront className="text-[#ca1515]" size={45} />,
    title: "Free Shipping",
    subtitle: "For all order over $99",
  },
  {
    icon: <Banknote  className="text-[#ca1515]" size={45} />,
    title: "Money Back Guarantee",
    subtitle: "If good have Problems",
  },
  {
    icon: <CircleDotDashed className="text-[#ca1515]" size={45} />,
    title: "Online Support 24/7",
    subtitle: "Dedicated support",
  },
  {
    icon: <Headphones  className="text-[#ca1515]" size={45} />,
    title: "Payment Secure",
    subtitle: "100% secure payment",
  },
];

export default function ShippingInfo() {
  return (
    <section className="w-full">
        <div className="w-[1167px] mx-4 md:mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 px-4 mt-[100px]">
      {shippingData.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div>{item.icon}</div>
          <div>
            <h4 className="font-semibold text-sm sm:text-base">{item.title}</h4>
            <p className="text-gray-600 text-sm">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
    </section>
  );
}
