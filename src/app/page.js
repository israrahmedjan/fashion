import Image from "next/image";
import Products from "./_components/produccts/Products";
import SearchBox from "./_components/produccts/SearchBox";

export default function Home() {
  return (
    <>
    <div className="py-2 px-8 mt-[120px] min-h-[600px] overflow-scroll">
       {/* <SearchBox /> */}
    <Products />
    </div>
    
     
    

   

    
    </>
  );
}
