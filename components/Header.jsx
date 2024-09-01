'use client';
import girlAvatar from '../assets/girl.jpg';
import { LuMenu } from 'react-icons/lu';
import boyAvatar from '../assets/boy.jpg';
import DarkModeToggle from './DarkModeToggle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/UserContext';
import { sidebarLinks } from '@/data';
import Logo from './Logo';
import Link from 'next/link';

const Header = ({ title }) => {
  const { webUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const logoutUser = () => {
    // console.log('called');
    localStorage.removeItem('token');
    router?.replace('/login');
  };

  return (
    <div className="sm:mt-3 sm:px-6 w-full">
      <div
        className={
          'w-full h-16 flex items-center justify-between sm:shadow-sm shadow-lg dark:bg-primaryBlue sm:rounded-lg bg-white px-6'
        }
      >
        <div className="block sm:hidden">
          <Logo />
        </div>
        <div className="sm:block hidden font-semibold text-black/75 text-lg dark:text-formHeading tracking-[0.015rem]">
          {title}
        </div>

        <div className="flex justify-between items-center gap-3">
          <DarkModeToggle />
          <Image
            src={
              webUser?.gender === 'Female' ? girlAvatar?.src : boyAvatar?.src
            }
            width={40}
            height={40}
            alt=""
            className="border border-black/40 rounded-full object-contain"
          />
          <div className="block relative sm:hidden w-full h-full">
            <LuMenu
              className="relative w-6 h-6 text-gray-500"
              onClick={() => {
                setMenuOpen((prev) => !prev);
              }}
            />
            <div
              className={`${
                menuOpen ? 'block' : 'hidden'
              } absolute shadow-lg bg-white dark:bg-primaryBlue w-40 top-12 -right-6 p-5 `}
            >
              {sidebarLinks.map((actions, index) => (
                <div key={index} className="">
                  {actions.links.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <Link
                        href={item?.href}
                        className="mb-4 text-black/75 dark:text-white/75"
                      >
                        {item?.name}
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
              <h1
                className="mb-1 text-black/75 text-sm dark:text-white/75"
                onClick={logoutUser}
              >
                Logout
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
