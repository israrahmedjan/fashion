'use client'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useCart from '@/store/cart';
import { ChevronRight, HomeIcon } from 'lucide-react';
import { useEffect, useState } from "react"
import { addCustomer } from "../user/userOperations"
import { loadStripe } from "@stripe/stripe-js";

import { useStore } from "zustand"
import useUserStore from "@/store/useUserStore"



const cartItems = [
  {
    name: "Product 1",
    price: 1999, // in cents = $19.99
    quantity: 1,
  },
  {
    name: "Product 2",
    price: 2999,
    quantity: 2,
  },
];

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  country: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  createAccount: z.boolean().optional(),
  cheque: z.boolean().optional(),
  paypal: z.boolean().optional(),
})

export default function Checkout() {
    const { item,clear } = useCart();
    const [client,setclient] = useState(false);
    const [total,setTotal] = useState(null);
    const {setUser,user} = useUserStore();
    
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Ahmed",
      lastName: "Jan",
      country: "Pakistan",
      address: "House #45, Street 10, Model Town",
      city: "Lahore",
      state: "Punjab",
      zip: "54000",
      phone: "+92-300-1234567",
      email: user.email,
      createAccount: false,
      cheque: false,
      paypal: false,
    },
  })

  const onSubmit = async (data) => {
  //  console.log("Form Data:", data)
  //  const result = await addCustomer(data);
    console.log("Customer", cartItems);
    console.log("Items", item)

 const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: item,customerData:data }),
    });
    const transectionData = await res.json();

    if (transectionData.url) {
      console.log("Transection Data",transectionData?.userData?.user);
      setUser(transectionData?.userData?.user);
      clear();
      window.location.href = transectionData.url;
    }

    // Handle order submission
  }

 const handleCheckout = async () => {
    // const res = await fetch("/api/checkout", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ items: cartItems }),
    // });
    // const data = await res.json();

    // if (data.url) {
    //   window.location.href = data.url;
    // }
  };

  
useEffect(() => {
    if (item && item.length > 0) {
      const calculatedTotal = item.reduce((acc, itm) => acc + parseInt(itm.price*itm.qty), 0);
      setTotal(calculatedTotal);
    } else {
      setTotal(0); // In case item is empty or undefined
    }
  }, [item]); // ✅ Dependency: Re-run when `item` changes


useEffect(() => {
            
        
               
           
            setclient(true)
            //setCartItems(item);
       
        }
            , [])
        if (!client) return null;
  return (
        <div className="max-w-[1167px] w-full px-4 mx-auto flex flex-col">

  {/* <button
      className="bg-black text-white px-4 py-2 rounded-md"
      onClick={handleCheckout}
    >
      Pay with Stripe
    </button> */}

              {item && (
    <div className="flex items-center text-sm md:text-base space-x-1 h-auto md:h-[55px] mt-4">
      <HomeIcon size={18} />
      <ChevronRight size={15} />
      <span className="font-medium">Home</span>
      <ChevronRight size={15} />
      <span>Check Out</span>
    </div>
  )}
            <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
 


      {/* Billing Form */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-xl font-bold">Billing Detail</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone *</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone Number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Email Address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country *</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Input placeholder="Street Address" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Town/City *</FormLabel>
                  <FormControl>
                    <Input placeholder="Town or City" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County/State *</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode / ZIP *</FormLabel>
                  <FormControl>
                    <Input placeholder="ZIP Code" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

          
          </form>
        </Form>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-100 p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">YOUR <span className="text-blue-600">ORDER</span></h2>
       {item.length>0 ? (
        <div>
             <div className="border-b border-gray-300 pb-2">
          <div className="flex justify-between font-semibold">
            <span>Product</span>
           
            <span>Total</span>
          </div>
          <div className="mt-2 space-y-1 text-sm text-gray-700">
            {item.map((itm,i)=>
            ( <div className="flex justify-between" key={i}><span>{`${i+1} - ${itm.productName} `}</span>
            <span>{`${itm.qty} x ${itm.price}`}</span>
            <span>${itm.price*itm.qty}</span></div>)
            )}
            {/* <div className="flex justify-between"><span>01. Chain buck bag</span><span>$30.00</span></div>
            <div className="flex justify-between"><span>02. Zip-pocket tote</span><span>$170.00</span></div>
            <div className="flex justify-between"><span>03. Black jean</span><span>$170.00</span></div>
            <div className="flex justify-between"><span>04. Cotton shirt</span><span>$110.00</span></div> */}
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm font-semibold">
          <div className="flex justify-between"><span>Subtotal</span><span className="text-red-600">
            ${total}</span></div>
          <div className="flex justify-between"><span>Total</span><span className="text-red-600">${total}</span></div>
        </div>
        </div>
       ):(<div>No Items Found.</div>)}
       

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <FormField
              control={form.control}
              name="createAccount"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Create an account?</FormLabel>
                </FormItem>
              )}
            />

            <p className="text-xs text-gray-500 pl-6">
              Create an account by entering the information below. If you are a returning customer log in at the top of the page.
            </p>

            <FormField
              control={form.control}
              name="cheque"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Cheque payment</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paypal"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>PayPal</FormLabel>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-red-600 hover:bg-black">
              PLACE ORDER
            </Button>
          </form>
        </Form>
      </div>
    </div>
   
    </div>
  )
}
