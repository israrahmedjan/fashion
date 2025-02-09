import React from 'react'

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
    <div className="w-8 h-8 border-4 border-secondary border-dashed rounded-full animate-spin"></div>
  </div>
  )
}

export default Loader