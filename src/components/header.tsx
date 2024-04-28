import React from "react";
import { auth, db } from "../../library/firebase";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const currentRoute = usePathname();
  return (
    <div className="bg-white  p-3 flex justify-between items-center">
      <div className="text-center text-[24px] font-[700] text-black">
        <Link href={"/"}>WeatherPlace</Link>
      </div>
      <div className="flex gap-5 ">
        {" "}
        <Link
          className={` py-2 px-4 rounded-[8px]  text-[16px] ${
            currentRoute === "/"
              ? "bg-[#3A8AED] text-white"
              : "bg-[#d1cfcf] text-black"
          }`}
          href={"/"}
        >
          {" "}
          Home
        </Link>
        <Link
          className={` py-2 px-4 rounded-[8px]  text-[16px] ${
            currentRoute === "/cart"
              ? "bg-[#3A8AED] text-white"
              : "bg-[#d1cfcf] text-black"
          }`}
          href={"/cart"}
        >
          {" "}
          Cart
        </Link>
      </div>
      <div className="flex gap-5 ">
        <button
          className="bg-[#E9222D] lg:w-[100px] w-[80px] p-1 rounded-[8px] text-white  text-[16px]"
          onClick={() => auth.signOut()}
        >
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
