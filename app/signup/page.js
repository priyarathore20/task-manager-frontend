'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Loader from '@/components/Loader';
import Logo from '@/components/Logo';
import { useSnackbar } from '@/context/SnackbarProvider';
import { AuthContext } from '@/context/UserContext';
import withAuth from '@/hoc/WithAuth';
import instance from '@/utils/axios';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

const genderOptions = ['Male', 'Female', 'Others'];

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    password: false,
    gender: false,
  });
  const router = useRouter();
  const { setWebUser } = useContext(AuthContext);
  const snackbar = useSnackbar();

  const isValidated = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    let validation = true;
    if (name.length === 0) {
      validation = false;
      setErrors((prev) => ({ ...prev, name: true }));
    }
    if (phoneNumber.length === 0 || !phoneRegex?.test(phoneNumber)) {
      validation = false;
      setErrors((prev) => ({ ...prev, phoneNumber: true }));
    }

    if (gender.length === 0) {
      validation = false;
      setErrors((prev) => ({ ...prev, gender: true }));
    }

    if (password.length === 0) {
      validation = false;
    }

    if (email.length === 0 || !emailRegex?.test(email)) {
      validation = false;
      setErrors((prev) => ({ ...prev, email: true }));
    }

    return validation;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    // console.log('inside register function');

    if (isValidated()) {
      const data = {
        name,
        email,
        phoneNumber,
        password,
        gender,
      };
      // console.log("inside is validated")
      try {
        setIsLoading(true);
        const res = await instance.post('/auth/signup', data);
        // console.log(res.data);
        const token = res?.data?.token;
        localStorage.setItem('token', token);
        const user = jwtDecode(token);
        setWebUser(user);
        snackbar('User created successfully', 'success');
        router.replace('/');
      } catch (error) {
        console.error(error);
        snackbar('Error creating user', 'error');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-screen w-screen h-screen  max-h-screen dark:bg-secondaryBlue bg-bgLight flex justify-center items-center">
      <div className="max-w-[350px] s:max-w-[445px]  w-full dark:bg-primaryBlue bg-white shadow-2xl rounded-lg px-8 py-7 flex flex-col items-center">
        <Logo />
        <div className="w-full mt-4 pt-2 pb-6 flex flex-col items-start">
          <h5 className="mb-1 dark:text-formHeading leading-8 text-grayHeading text-2xl font-medium">
            Manage your tasks here!
          </h5>
          <p className="dark:text-gray-500 text-formTitle leading-[1.3125rem] tracking-[0.0094rem] text-base font-medium">
            Effortlessly manage your tasks and stay organized with Task Master!
          </p>
        </div>
        <form
          onSubmit={registerUser}
          className=" py-3 flex w-full gap-5 flex-col justify-center items-start"
        >
          <Input
            placeholder={'Name*'}
            error={errors?.name}
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading}
            type={'text'}
            fullWidth
          />
          <div className="flex justify-between w-full gap-3">
            <div>
              <select
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                className="py-2 outline-none s:w-32 w-[52px] border border-cardSubTitle rounded-lg px-2"
              >
                {genderOptions.map((gender, i) => (
                  <option
                    value={gender}
                    key={i}
                    className="text-gray-700 py-1 outline-none capitalize"
                  >
                    {gender?.charAt(0).toUpperCase() + gender?.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <Input
              placeholder={'Phone Number*'}
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              error={errors?.phoneNumber}
              disabled={isLoading}
              maxLength={10}
              type="tel"
            />
          </div>
          <Input
            error={errors?.email}
            placeholder={'Email*'}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
            fullWidth
            type={'email'}
          />
          <Input
            placeholder={'Password*'}
            error={errors?.password}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
            fullWidth
            type={'password'}
          />
          <Button
            label={isLoading ? <Loader /> : 'REGISTER'}
            type={'submit'}
            disabled={isLoading}
            isLoading={isLoading}
            fullWidth
          />
          <div className="w-full p-5 flex s:flex-row flex-col items-center justify-center text-formTitle dark:text-formHeading">
            <p>Already have an account?</p>
            <Link href={'/login'} className="text-formButton ml-2">
              {' '}
              Sign in instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuth(RegisterPage);
