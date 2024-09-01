import { MdOutlineTaskAlt } from 'react-icons/md';

import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'}>
      <div className="flex flex-1 items-center gap-x-3">
        <MdOutlineTaskAlt className="w-8 xs:w-12 h-8 xs:h-12 text-formButton" />
        <h2
          className={
            'dark:text-formHeading text-grayHeading s:text-2xl font-bold'
          }
        >
          Task Manager
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
