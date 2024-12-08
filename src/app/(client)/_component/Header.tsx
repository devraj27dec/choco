'use client';
import { cn } from "@/lib/utils";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const sesssion = useSession();
  const navItems = [
    {label: 'Home' , href: '/'},
    {label: 'Offers' , href: '/offers'},
    {label: 'Orders' , href: '/account/orders'},
    {label: "Store Locator" , href:"/store-locator"}
  ]
  return (
    <header>
      <div className=' flex h-10 items-center justify-center text-center bg-brown-900 text-white px-2 md:px-4'>
        <span className=' md:text-sm text-xs'>
          Order 2 Delight Dairy Choco bars today and save ₹100 instantly!
        </span>
      </div>
      <nav className=' h-14 flex items-center justify-center'>
        <ul className=" flex items-center justify-center gap-4 md:gap-6">
        {navItems.map((item) => (
            <li key={item.href}
              className={cn('text-brown-300 underline-offset-4 transition-all hover:cursor-pointer hover:text-brown-900 hover:underline' , pathname === item.href && 'font-semibold text-brown-900 underline' )}
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
            {!sesssion.data?.user ? (
              <li className=" text-brown-300 underline-offset-4 transition-all hover:cursor-pointer hover:text-brown-900 hover:underline ">
                <button onClick={() => signIn()}>
                  Sign in
                </button>
            </li>
            ) : (
              <li className=" text-brown-300 underline-offset-4 transition-all hover:cursor-pointer hover:text-brown-900 hover:underline " onClick={() => signOut()}>
                <button>
                  SignUp
                </button>
              </li>
            )}
        </ul>
      </nav>
    </header>
  )
}

export default Header