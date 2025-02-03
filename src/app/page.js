import Image from "next/image";
import Products from "./_components/produccts/Products";

export default function Home() {
  return (
    <>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
<h1>Welcom to next js app</h1>
<div>
  <Products />
</div>
    </div>
    </>
  );
}
