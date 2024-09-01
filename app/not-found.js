'use client';
import Image from 'next/image';
import React from 'react';
import notFound from '../assets/not-found.png';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen overflow-hidden justify-center flex items-center flex-col">
      <Image src={notFound} height={300} width={300} alt="" />
      <h2 className="text-3xl font-medium my-4 text-grayHeading">
        Oops! This page is not available.
      </h2>
      <button
        onClick={() => router.push('/')}
        className="bg-formButton px-4 py-2 rounded-full text-white"
      >
        Return to homepage
      </button>
    </div>
  );
};

export default NotFound;
