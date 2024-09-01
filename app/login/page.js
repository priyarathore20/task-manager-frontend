'use client';
import Input from '@/components/Input';
import { AuthContext } from '@/context/UserContext';
import instance from '@/utils/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { MdOutlineTaskAlt } from 'react-icons/md';
import { jwtDecode } from 'jwt-decode';
import Button from '@/components/Button';
import withAuth from '@/hoc/WithAuth';
import { useSnackbar } from '@/context/SnackbarProvider';

const LoginPage = () => {
  const [email, setEmail] = useState('userr1@gmail.com');
  const [password, setPassword] = useState('password');
  const [errors, setErrors] = useState({ email: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setWebUser } = useContext(AuthContext);
  const showSnackbar = useSnackbar();

  const isValidated = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let validation = true;

    if (email.length === 0 || !emailRegex?.test(email)) {
      validation = false;
      setErrors((prev) => ({ ...prev, email: true }));
    }
    if (password.length === 0) {
      validation = false;
      setErrors((prev) => ({ ...prev, password: true }));
    }
    return validation;
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setErrors({
      email: false,
      password: false,
    });
    if (isValidated()) {
      const data = {
        email,
        password,
      };
      try {
        setIsLoading(true);
        const res = await instance.post('/auth/login', data);
        const token = res?.data?.token;
        localStorage.setItem('token', token);
        const user = jwtDecode(token);
        setWebUser(user);
        router.replace('/');
        showSnackbar('Logged in successfully.', 'success');
      } catch (error) {
        console.error(error);
        showSnackbar(error?.response?.data?.message, 'error');
        setIsLoading(false);
      }
      setErrors(false);
    }
  };

  return (
    <div className="max-w-screen w-screen h-screen max-h-screen dark:bg-secondaryBlue bg-bgLight flex justify-center items-center">
      <div className="max-w-[350px] s:max-w-[445px]  w-full dark:bg-primaryBlue shadow-2xl  bg-white h-[660px] rounded-lg px-6 py-7 flex flex-col items-center">
        <div className="flex items-center p-6">
          <MdOutlineTaskAlt className="h-12 w-12 pr-[10px] text-formButton" />
          <h2 className="dark:text-formHeading text-grayHeading text-2xl font-bold">
            Task Manager
          </h2>
        </div>
        <div className="pt-2  pb-6 flex flex-col items-start">
          <h5 className="mb-1 dark:text-formHeading tracking-normal leading-8 text-grayHeading text-2xl font-medium">
            Let's get things done together!
          </h5>
          <p className="text-formTitle  dark:text-gray-500 text-base font-normal tracking-[0.0094rem] leading-[1.3125rem]">
            Task Manager is your go-to app for managing tasks, staying
            organized, and maximizing productivity—all in one place!
          </p>
        </div>
        <div className="w-full flex flex-col items-start">
          <div className="mb-3 w-full">
            <Input
              placeholder={'Email'}
              error={errors?.email}
              onChange={(e) => setEmail(e.target.value)}
              type={'text'}
              value={email}
              disabled={isLoading}
              fullWidth
            />
          </div>
          <div className="mb-3 w-full">
            <Input
              error={errors?.password}
              placeholder={'Password'}
              onChange={(e) => setPassword(e.target.value)}
              type={'password'}
              value={password}
              disabled={isLoading}
              fullWidth
            />
          </div>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onClick={loginUser}
            label={'LOGIN'}
            fullWidth
          />
          <div className="w-full s:flex-row flex-col p-5 flex items-center justify-center text-formTitle leading-6 dark:text-formHeading">
            <p> New on our platform? </p>
            <Link href={'/signup'} className="text-formButton ml-2">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(LoginPage);
