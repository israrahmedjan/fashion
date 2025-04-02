"use client";

import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../redux/slices/counterSlice";
import { getUserInfo } from "@/redux/slices/userSlice";
//import { increment } from "../redux/slices/counterSlice";

export default function Counter() {
  const count = useSelector((state) => state.counter.value);
  const userData = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  return (
    <div className="text-center p-4">
        <p>{JSON.stringify(userData,null,2)}</p>
        <p>Add New Data - <button onClick={()=>dispatch(getUserInfo({name:"israr ahmed"}))}>Add New Data!</button></p>
      <h1 className="text-2xl font-bold">Counter: {count}</h1>
      <div className="mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded mr-2"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Increment by 5
        </button>
      </div>
    </div>
  );
}
