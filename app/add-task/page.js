'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Loader from '@/components/Loader';
import Logo from '@/components/Logo';
import Dashboard from '@/hoc/Dashboard';
import instance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import './styles.css';
import { useSnackbar } from '@/context/SnackbarProvider';
import { STATUS } from '@/utils/constants';

const AddTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    status: false,
    description: false,
    dueDate: false,
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(STATUS.todo);
  const [dueDate, setDueDate] = useState('');
  const showSnackbar = useSnackbar();

  const isValidated = () => {
    let validation = true;
    if (title.length === 0) {
      validation = false;
      setErrors((prev) => ({ ...prev, title: true }));
    }
    if (description.length === 0) {
      validation = false;
      setErrors((prev) => ({ ...prev, description: true }));
    }
    if (status.length === 0) {
      validation = false;
      setErrors((prev) => ({ ...prev, status: true }));
    }
    if (dueDate.length === 0) {
      validation = false;
      setErrors((prev) => ({ ...prev, dueDate: true }));
    }
    return validation;
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('To do');
    setDueDate('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidated()) {
      const data = {
        title,
        description,
        dueDate,
        status,
      };
      try {
        setIsLoading(true);
        await instance.post('/tasks/add-task', data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        showSnackbar('Task added successfully');
        setIsLoading(false);
        resetForm();
      } catch (error) {
        showSnackbar(error?.response?.data?.message, 'error');
        setIsLoading(false);
      }
    } else showSnackbar('All fields are required.', 'error');
  };

  return (
    <Dashboard>
      <div className="items-center dark:bg-secondaryBlue flex flex-col justify-center center bg-transparent">
        <Header title={'Add a Task...!'} />
        <div className=" items-center w-full max-w-[450px] my-5 rounded-lg px-5 py-7 flex flex-col justify-center sm:bg-white sm:dark:bg-primaryBlue">
          <div className="sm:block hidden">
            <Logo />
          </div>
          <h2
            className={
              'm-3 px-2 text-xl dark:text-formHeading font-medium text-grayHeading'
            }
          >
            Add a new task here!
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center center w-full"
          >
            <div className="flex flex-col gap-y-3 w-full  mb-3">
              <Input
                error={errors?.title}
                label={'Title*'}
                type="text"
                fullWidth
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Input
                textarea={true}
                label={'Description*'}
                error={errors?.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Input
                error={errors?.dueDate}
                label={'Due date*'}
                type="date"
                className="input"
                value={dueDate}
                fullWidth
                onChange={(e) => setDueDate(e.target.value)}
              />

              <div className="flex flex-col">
                <label className=" text-grayHeading text-lg dark:text-white/75">
                  Status:*
                </label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  className="bg-transparent dark:text-formHeading py-2 outline-none border min-w-36 border-cardSubTitle rounded-lg px-2"
                >
                  {Object.keys(STATUS).map((status, i) => (
                    <option
                      value={status}
                      key={i}
                      className="text-gray-700 dark:bg-black bg-white dark:text-formHeading py-1 outline-none"
                    >
                      {STATUS[status]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              size={'small'}
              label={isLoading ? <Loader size={'small'} /> : 'SUBMIT'}
            />
          </form>
        </div>
      </div>
    </Dashboard>
  );
};

export default AddTask;
