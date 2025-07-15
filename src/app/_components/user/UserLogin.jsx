'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useMessageStore from '@/store/useMessageStore';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/useUserStore';


import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Message from './messages';
import { userSignIn } from './userOperations';

const formSchema = z.object({
  email: z.string().min(2, { message: "Email is required" }).email({ message: "Email is invalid!" }),
  password: z.string().min(2, { message: "Password is required" })
});

function UserLogin({setuserLogin}) {
  const {user} = useUserStore();
  const form = useForm({
  
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "israr@gmail.com",
      password: user?.password
    }
  });
  const { message,type,setMessage } = useMessageStore();
  const [loading,setLoading] = useState(false)
  const router = useRouter();
  async function onSubmit(values) {
    console.log(values);

   console.log(values);
setLoading(true);
const result = await userSignIn(values);
if(result.success)
{

setLoading(false);
setMessage(`User login in successfully .`, "success");
setuserLogin(false);
router.push("/");

//setIsLogin(true);
console.log("In correct bloxk")
}

  //
  console.log("Mu result is ", result);

  }

  return (
    <>
               
               
                 {/* {message && (
<Message />
)} */}
   
    <div className="flex items-start justify-start px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl  border-gray-200">
 
 <h2 className="relative text-[20px] text-left text-[#111111] font-[600] mb-6 uppercase after:content-[''] after:block after:h-[2px] after:w-[50px] after:bg-[#ca1515] after:mt-2 after:ml-0">
  Login to Your Account
</h2>





        {/* <div className="w-[60px] h-[2px] bg-[#ca1515] mt-1"></div> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-[#444444] text-base md:text-[14px]">
            {/* Email */}
      <FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="flex justify-start">Email</FormLabel>
      <FormControl>
        <Input
          placeholder="Enter your email"
          {...field}
          className="border border-gray-300 rounded-none focus:border-gray-300 focus:outline-none focus:ring-0 ring-0 outline-none shadow-none transition-all duration-200"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="flex justify-start">Password</FormLabel>
      <FormControl>
        <Input
          type="password"
          placeholder="Enter your password"
          {...field}
          className="border border-gray-300 rounded-none focus:border-gray-300 focus:outline-none focus:ring-0 ring-0 outline-none shadow-none transition-all duration-200"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ca1515] hover:bg-black-700 transition-all duration-200 font-[600] py-2 rounded-md"
            >
             
              {loading ? "Sign In ....":"Sign In"}
            </Button>
          </form>
        </Form>

        {/* Optional Links */}
        <p className="text-[14px] font-medium text-center mt-6 text-gray-500">
          Forgot your password?{' '}
          <a href="#" className="text-[#111111]">Reset here</a>
        </p>
      </div>
    </div>
     </>
  );
}

export default UserLogin;
