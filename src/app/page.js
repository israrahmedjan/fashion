import Image from "next/image";
import Products from "./_components/produccts/Products";
import SearchBox from "./_components/produccts/SearchBox";

export default function Home() {
  return (
    <>
    <div className="border-red-400 border px-8 mt-[120px] h-[800px]">
    <Products />
    </div>
    
    
    
<h1>Welcom to next js app</h1>
<div className="flex justify-center">
  {/* <SearchBox /> */}
</div>
<div>
 
</div>
   

    
    </>
  );
}
