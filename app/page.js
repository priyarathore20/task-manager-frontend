'use client';
import Button from '@/components/Button';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import TaskCard from '@/components/TaskCard';
import Dashboard from '@/hoc/Dashboard';
import withAuth from '@/hoc/WithAuth';
import notFound from '../assets/not-found.png';
import instance from '@/utils/axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const res = await instance.get('/tasks', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(res.data.data);
      // console.log(res.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Dashboard>
      <Header title="My Tasks" />
      <div className="p-6 mt-[14px]">
        {isLoading ? (
          <div className="h-[70vh] w-full">
            <Loader />
          </div>
        ) : tasks.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3">
            {tasks.map((task, index) => {
              return (
                <TaskCard
                  id={task?._id}
                  taskTitle={task?.title}
                  taskDescription={task.description}
                  key={index}
                  taskStatus={task?.status}
                  taskDueDate={task?.dueDate}
                  setTasks={setTasks}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center gap-4 items-center">
            <Image src={notFound} height={200} width={200} alt="" />
            <p className="text-xl font-medium text-gray-500">
              No task to show.
            </p>
            <Button
              label={'Click to add you first task'}
              onClick={() => {
                setIsLoading(true);
                router.push('/add-task');
                setIsLoading(false);
              }}
            />
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default withAuth(Home);
