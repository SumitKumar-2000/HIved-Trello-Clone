"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BsKanban,
  BsPersonCircle,
  BsMoon, 
  BsBrightnessHigh,
} from "react-icons/bs";

// next-auth imports
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Image from "next/image";

const Nav = ({ darkMode, setDarkMode }) => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const providerResponse = await getProviders();
      setProviders(providerResponse);
    })();
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="px-4 md:px-8 py-2 md:py-4 flex_between w-full border-b-2 border-black/10 dark:border-black/20">
      <Link
        href="/"
        className="flex_center gap-1 dark:text-white text-[#151718] cursor-pointer"
      >
        <BsKanban className="h-[24px] md:h-[28px] w-[24px] md:w-[26px] dark:text-orange-300 text-orange-500" />
        <div className="hidden md:block text-2xl dark:text-orange-300 text-orange-500 font-bold">
          Hived
        </div>
      </Link>

      <div className="flex_center gap-2">
        <div
          onClick={() => setDarkMode((prev) => !prev)}
          className="rounded-full p-1.5 w-[28px] h-[28px] md:w-[30px] md:h-[30px] flex items-center cursor-pointer"
        >
          <BsBrightnessHigh
            className={`${
              darkMode ? "h-0 w-0" : "h-full w-full"
            } rounded-full transition-all duration-500`}
          />
          <BsMoon
            className={`${
              darkMode ? "h-full w-full" : "h-0 w-0"
            } transition-all duration-500 rounded-full`}
          />
        </div>

        {session?.user ? (
          <div className="flex_center gap-2">
            <div
              className="flex_center w-[28px] h-[28px] md:w-[30px] md:h-[30px] rounded-full relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {session?.user.image ? (
                <Image
                  src={session?.user.image}
                  alt="User Img"
                  width={30}
                  height={30}
                  className="cursor-pointer rounded-full"
                />
              ) : (
                <BsPersonCircle className="w-full h-full text-[#151718] cursor-pointer hover:text-white transition-all duration-200" />
              )}
              <div
                className={`dropdown ${
                  isHovered ? "scale-[100%]" : "scale-[0%]"
                }`}
              >
                <Link href={`/boards/u/${session?.user.id}`} className="dropdown_link">
                  Boards
                </Link>
                <div
                  onClick={() => signOut()}
                  className="dropdown_link cursor-pointer"
                >
                  Sign Out
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="dark_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
