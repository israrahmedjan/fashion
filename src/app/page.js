import Image from "next/image";
import Products from "./_components/produccts/Products";
import Counter from "@/components/Counter";
// import SearchBox from "./_components/produccts/SearchBox";

export default function Home() {
  return (
    <>
    <div className="py-2 px-4 lg:mt-[180px] mt-[150px] min-h-[600px]">
       {/* <SearchBox /> */}
       <h1>Counter file</h1>
       <Counter />
    <Products />
    </div>
    
     
    

   

    
    </>
  );
}
