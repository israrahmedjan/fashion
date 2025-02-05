import Image from "next/image";
import Products from "./_components/produccts/Products";
import SearchBox from "./_components/produccts/SearchBox";

export default function Home() {
  return (
    <>
    <div className="grid grid-cols-1">
<h1>Welcom to next js app</h1>
<div className="flex justify-center">
  <SearchBox />
</div>
<div>
  <Products />
</div>
    </div>
    </>
  );
}
