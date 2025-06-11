'use client'
import { useEffect, useState } from 'react'
import { Circle } from 'lucide-react'

const CountdownTimer = () => {
      const [mounted, setMounted] = useState(false)
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-07-10T00:00:00') // change as needed
    const now = new Date()
    const difference = targetDate - now

    let timeLeft = {}
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    setMounted(true) // Avoid hydration error
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null // Prevent hydration error
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-[390px] bg-gray-100 text-center">
      {/* Circle Background */}
      <div className="flex justify-center w-[100%] ">
       <div className='relative w-[182px] h-[182px] rounded-full bg-white shadow-md flex items-center justify-center mb-4 '>
        {/* Optional Lucide icon */}
        {/* <Circle className="absolute text-gray-200 -z-10" /> */}

        <div className='flex flex-col gap-0 justify-center items-center'>
          <p className=" text-[#111111] text-base md:text-[12px] font-[500] ">DISCOUNT</p>
          <h1 className="text-[#ca1515] text-[50px] md:text-[60px] font-cookie font-[500] whitespace-nowrap">Summer 2019</h1>
          <p className="text-[#111111] text-base text-[16px] mt-1">SALE <span className="text-[#ca1515] text-[18px] font-[700]">50%</span></p>
        </div>
        </div>
      </div>

      {/* Countdown Timer */}
      
      <div className="flex gap-6 text-black font-bold text-xl md:text-2xl">
        <div className='flex gap-1 justify-center items-baseline'><span className='md:text-[#0000000] md:text-[32px] font-[600]'>{timeLeft.days || '00'}</span><div className="text-base md:text-[14px] font-[400]">Day</div></div>
        <div className='flex gap-1 justify-center items-baseline'><span className='md:text-[#0000000] md:text-[32px] font-[600]'>{timeLeft.hours || '00'}</span><div className="text-base md:text-[14px] font-[400]">Hour</div></div>
        <div className='flex gap-1 justify-center items-baseline'><span className='md:text-[#0000000] md:text-[32px] font-[600]'>{timeLeft.minutes || '00'}</span><div className="text-base md:text-[14px] font-[400]">Min</div></div>
        <div className='flex gap-1 justify-center items-baseline'><span className='md:text-[#0000000] md:text-[32px] font-[600]'>{timeLeft.seconds || '00'}</span><div className="text-base md:text-[14px] font-[400]">Sec</div></div>
      </div>

      {/* Button */}
      <button className="mt-6 text-black  border-b-2 border-[#ca1515] hover:text-[#111111] font-[600] transition">SHOP NOW</button>
    </div>
    </>
  )
}

export default CountdownTimer
