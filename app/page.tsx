import Image from "next/image";
import ThemeSwitch from "./context/ThemeSwitch";
import Card from "./components/Card";

export default  function Home() {
  // let data = await fetch('/api/user')
  // let message = await data.json() ;
  // console.log(message);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="in">
        <Card />
        <ThemeSwitch />
        


      </div>
    </main>
  );
}
