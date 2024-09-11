import Image from "next/image";
import ThemeSwitch from "./context/ThemeSwitch";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="in">
        <p>Hello</p>
        <ThemeSwitch />
      </div>
    </main>
  );
}
