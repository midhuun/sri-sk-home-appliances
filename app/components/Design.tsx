import Image from 'next/image'
import React from 'react'

export const Design = () => {
  return (
    <div className="container">
    <div  className="background-image border rounded-lg bg-white h-[80vh] w-full object-cover">
    <Image height={300} width={300} src="/fridge.png" className="photo photo-left" alt="left photo" />
    <Image height={300} width={300} src="/grinder.png" className="photo photo-right" alt="right photo" />
    <Image height={300} width={300} src="/washingmachine.png" className="photo photo-middle" alt="middle photo" />
  </div>
  </div>
    
  )
}
