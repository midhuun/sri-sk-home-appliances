
import ThemeSwitch from "../context/ThemeSwitch"
import Image from "next/image"
const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <div className="flex w-full items-center justify-between px-4">
          <div className="left flex items-center gap-5 ">
          <Image height={80} alt="logo" width={80} src='/logo.png' />
          <input className=" h-8 w-[400px]" type="text" />
            </div>
            <div className="center">
             
            </div>
            <div className="right">
            <ThemeSwitch />
            </div>
        </div>
        
      {children}
    </div>
  )
}

export default layout
