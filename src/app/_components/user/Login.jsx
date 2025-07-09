'use client'
import React, { useState } from 'react';
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';


function UserComponent({setuserLogin}) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(prev => !prev);
  };

  return (
    <div className="max-w-md mx-auto p-2">
        {/* <div>status {JSON.stringify(isLogin,null,2)}</div> */}
      {isLogin ? (
        <>
          <UserLogin setuserLogin={setuserLogin} />
          <p className="text-base md:text-[14px] text-center mt-4">
            Don't have an account?{' '}
            <button onClick={toggleForm} className="text-[#ca1515]">
              Register here
            </button>
          </p>
        </>
      ) : (
        <>
          <UserRegister setIsLogin={setIsLogin} />
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <button onClick={toggleForm} className="text-[#ca1515]">
              Login here
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default UserComponent;
