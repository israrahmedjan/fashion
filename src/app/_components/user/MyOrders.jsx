'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronRight, HomeIcon } from "lucide-react";
import Link from "next/link";

import useUserStore from "@/store/useUserStore";
import { useEffect, useState } from "react";
import { myOrdersAPI } from "./userOperations";
import LoadingSpinner from "../general/LoadingSpinner";
export default function MyOrders() {
  const [items,setItems] = useState();
  const {user} = useUserStore();
  const getOrderData = async ()=>
  {
   
    const ordersData = await myOrdersAPI(user?.email);
    console.log("My orders in client Components", ordersData);
      setItems(ordersData);  
      
  
   
    
  }
useEffect(() => {
  if (user?.email) {
    console.log("User found:", user.email);
    getOrderData(); 
  }
}, [user]);
  return (
    <div className="max-w-screen-xl w-full px-4 mx-auto flex flex-col space-y-6">
   
      {/* Breadcrumb */}
     
      {(items && items.length>0) ? (<div>
      {items && (
        <div className="flex flex-wrap items-center text-sm md:text-base gap-1 mt-4">
          <HomeIcon size={18} />
          <ChevronRight size={15} />
          <span className="font-medium">Home</span>
          <ChevronRight size={15} />
          <Link href="#"><span className="font-medium">My Orders</span></Link>
          <ChevronRight size={15} />
          <span>Orders</span>
        </div>
      )}

      {/* Accordion for Orders */}
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={item._id} value={`item-${item._id}`} className="border-b">
            <AccordionTrigger className="px-4 py-3 hover:bg-gray-100 w-full text-left">
              <div className="flex flex-col md:flex-row text-base md:text-[15px] flex-wrap md:justify-between gap-2 w-full">
                <span><strong className="font-[500]">{index + 1}</strong></span>

<span className="max-w-xs break-all text-sm">
                  <strong className="font-[600]">Email</strong>
                  <span className="block">{item.customers.email}</span>
                </span>
                <span className="max-w-xs break-all text-sm">
                  <strong className="font-[600]">SessionID</strong>
                  <span className="block">{item.stripeSessionId}</span>
                </span>

                 <span className="max-w-xs break-all text-sm">
                  <strong className="font-[600]">Total </strong>
                  <span className="block">${item.totalAmount/100}</span>
                </span>

                <span className="max-w-xs break-all text-sm">
                  <strong className="font-[600]">Date</strong>
                  <span className="block">
                    <span>
  {new Date(item.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Karachi"
  })}
</span>
                  </span>
                </span>

                 <span className="max-w-xs break-all text-sm">
                  <strong className="font-[600]">Status </strong>
                  <span className="block">{item.status}</span>
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {(item.products || []).map((prod, i) => (
                      <TableRow key={i}>
                        <TableCell>{i + 1}</TableCell>
                        <TableCell>{prod.name}</TableCell>
                        <TableCell>${prod.price}</TableCell>
                        <TableCell>{prod.quantity}</TableCell>
                         <TableCell>{prod.quantity*prod.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>):(<div className="flex h-screen justify-center items-center">
        <LoadingSpinner />
      </div>)}
    </div>
  );
}
