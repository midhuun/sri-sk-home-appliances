import ThemeSwitch from "../context/ThemeSwitch"
const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <div className="flex w-full justify-between">
            <h1>Hello</h1>
            <ThemeSwitch />
        </div>
        
      {children}
    </div>
  )
}

export default layout
