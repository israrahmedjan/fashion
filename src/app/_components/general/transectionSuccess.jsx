'use client';
import useUserStore from "@/store/useUserStore";
import Link from "next/link";
import { CheckCircle, LogIn } from "lucide-react";
import { userSignIn } from "../user/userOperations";
import useMessageStore from "@/store/useMessageStore";
import { useRouter } from "next/navigation";
export default function TransactionSuccess() {
  const { user } = useUserStore();
  const {setMessage} = useMessageStore();
  const router = useRouter();
  const handleSignIn = async()=>
  {
    
   console.log("Hello",user)
    if(user.password == "")
    {
     //router.push("/?login=1"); 
     console.log("Yes pasword is empty") 
    window.location.href = "/?login=1";
     //router.push("/?login=1"); 
     return;
   
    }
    const result = await userSignIn(user);
    if(result.success)
{


setMessage(`User login in successfully .`, "success");

router.push("/");

//setIsLogin(true);
console.log("In correct bloxk")
}

  }

  return (
    <div className="px-4 sm:px-6 md:px-8">
      {user && (
       <div className="mt-10 w-full max-w-2xl mx-auto  bg-gray-50 border border-gray-100 p-5 sm:p-6 md:p-8 
        rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="text-[#111111] w-10 h-10" />
            <h2 className="text-xl sm:text-2xl font-[500] text-[#111111]">
              Your Transaction was successfully done!
            </h2>
          </div>

          <p className="mb-4 text-sm sm:text-base text-[#111111]">
            Your account has been created. You can now log in to track your order status.
          </p>

          <div className="bg-white border border-gray-200 p-4 rounded-md mb-4 text-sm text-[#111111]">
            <p className="mb-1">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Temporary Password:</strong> {user.password}
            </p>
          </div>
<div className="w-1/2 mx-auto">
{user.password != "" ? (<div>
     <div
           
            className="flex justify-center items-center gap-2 px-4 
            py-2 sm:px-5 sm:py-2.5 bg-[#ca1515] text-white text-sm sm:text-base font-medium 
            rounded-full hover:bg-gray-700 transition"
            onClick={()=>handleSignIn()}
          >
            <LogIn className="w-4 h-4 flex justify-end" />
            Login to your Account
          </div>
</div>):(<div>

     <div
           
            className="flex justify-center items-center gap-2 px-4 
            py-2 sm:px-5 sm:py-2.5 bg-[#ca1515] text-white text-sm sm:text-base font-medium 
            rounded-full hover:bg-gray-700 transition"
            onClick={()=>handleSignIn()}
          >
            <LogIn className="w-4 h-4 flex justify-end" />
            Login to your Account
          </div>
</div>)}
         
          </div>
        </div>
      )}
    </div>
  );
}
