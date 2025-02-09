import Image from "next/image";
import Products from "./_components/produccts/Products";
// import SearchBox from "./_components/produccts/SearchBox";

export default function Home() {
  return (
    <>
    <div className="py-2 px-4 lg:mt-[180px] mt-[130px] min-h-[600px]">
       {/* <SearchBox /> */}
    <Products />
    </div>
    
     
    

   

    
    </>
  );
}
