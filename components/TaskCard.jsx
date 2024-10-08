'use client';
import React, { useState } from 'react';
import Button from './Button';
import classNames from 'classnames';
import Dialog from './Dialog';
import Logo from './Logo';
import Input from './Input';
import { useSnackbar } from '@/context/SnackbarProvider';
import instance from '@/utils/axios';
import { STATUS } from '@/utils/constants';
import { isValidated } from '@/utils/helper';
import Loader from './Loader';

const TaskCard = ({
  id,
  taskTitle,
  taskDescription,
  taskStatus,
  taskDueDate,
  setTasks,
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(taskTitle);
  const [description, setDescription] = useState(taskDescription);
  const [status, setStatus] = useState(taskStatus);
  const [dueDate, setDueDate] = useState(taskDueDate);
  const [error, setError] = useState({
    title: false,
    status: false,
    description: false,
    dueDate: false,
  });
  const showSnackbar = useSnackbar();

  const editTask = async (e) => {
    e.preventDefault();
    const data = { title, description, status, dueDate };
    setError({
      title: false,
      status: false,
      description: false,
      dueDate: false,
    });
    if (isValidated(title, description, status, dueDate, setError)) {
      try {
        setIsLoading(true);
        await instance.put(
          `/tasks/edit-task/${id}`,
          { ...data, title: title?.trim(), description: description?.trim() },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setTasks((tasks) => {
          const newArr = [];
          tasks.forEach((task) => {
            if (task._id === id) {
              task.title = title?.trim();
              task.description = description?.trim();
              task.status = status;
              task.dueDate = dueDate;
            }
            newArr.push(task);
          });
          return newArr;
        });
        setEditDialogOpen(false);
        showSnackbar('Task updated successfully');
        setIsLoading(false);
      } catch (error) {
        showSnackbar(error?.response?.data?.message, 'error');
        setIsLoading(false);
      }
    } else showSnackbar('All fields are required!', 'error');
  };

  const deleteTask = async () => {
    try {
      setIsLoading(true);
      await instance.delete(`/tasks/delete-task/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
      setDeleteDialogOpen(false);
      showSnackbar('Task deleted successfully', 'error');
      setIsLoading(false);
    } catch (error) {
      showSnackbar(error?.response?.data?.message, 'error');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white dark:bg-primaryBlue shadow-lg p-4 rounded-lg w-full max-w-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-formButton text-xl">{taskTitle}</h3>
      </div>
      <p className="flex-1 mb-2 text-ellipsis text-gray-500 overflow-hidden">
        {taskDescription}
      </p>
      <div className="flex justify-between items-center mt-5">
        <div className="text-gray-500 text-sm">Due: {taskDueDate}</div>
        <div
          className={classNames(`text-sm font-semibold px-2 py-1 rounded`, {
            'dark:bg-green-900 dark:text-green-400 bg-green-200 text-green-700':
              taskStatus === 'completed',

            'dark:bg-errorBg dark:text-white bg-rose-100 text-errorBg':
              taskStatus === 'todo',

            'dark:bg-yellow-600 dark:text-white bg-yellow-200 text-yellow-600':
              taskStatus === 'inProgress',
          })}
        >
          {STATUS[taskStatus]}
        </div>
      </div>
      <div className="flex justify-end items-center gap-4 mt-10">
        <Button
          size={'small'}
          label={'Edit ✏️'}
          onClick={() => setEditDialogOpen(true)}
        />
        <Button
          size={'small'}
          label={'Delete 🗑️'}
          onClick={() => setDeleteDialogOpen(true)}
        />
      </div>

      {/* -------------- EDIT TASK DIALOG ----------------*/}
      <Dialog open={editDialogOpen}>
        <div className="flex flex-col items-center bg-white dark:bg-primaryBlue p-8 rounded-lg w-full">
          <Logo />

          <form className="w-[350px]">
            <div className="my-4">
              <div className="flex flex-col gap-y-3 mb-3 w-full">
                <Input
                  label={'Title*'}
                  type="text"
                  error={error?.title}
                  fullWidth
                  className="input"
                  disabled={isLoading}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                  textarea={true}
                  disabled={isLoading}
                  subLabel={`(${description.length} / 300 words)`}
                  error={error?.description}
                  label={'Description*'}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <Input
                  label={'Due date*'}
                  error={error?.dueDate}
                  type="date"
                  disabled={isLoading}
                  className="input"
                  value={dueDate}
                  fullWidth
                  onChange={(e) => setDueDate(e.target.value)}
                />

                <div className="flex flex-col">
                  <label className="text-grayHeading text-lg dark:text-white/75">
                    Status:*
                  </label>
                  <select
                    value={status}
                    disabled={isLoading}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    className="border-cardSubTitle bg-transparent px-2 py-2 border rounded-lg min-w-36 dark:text-formHeading outline-none"
                  >
                    {Object.keys(STATUS).map((status, i) => (
                      <option
                        value={status}
                        key={i}
                        className="bg-white dark:bg-black py-1 text-gray-700 dark:text-formHeading outline-none"
                      >
                        {STATUS[status]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-5">
              <Button
                label={isLoading ? <Loader size={'small'} /> : 'Save'}
                disabled={isLoading}
                size={'small'}
                onClick={editTask}
              />
              <Button
                label={'Cancel'}
                disabled={isLoading}
                size={'small'}
                onClick={(e) => {
                  e.preventDefault();
                  setEditDialogOpen(false);
                  setTitle(taskTitle);
                  setDescription(taskDescription);
                  setStatus(taskStatus);
                  setDueDate(taskDueDate);
                }}
              />
            </div>
          </form>
        </div>
      </Dialog>

      {/* -------------- DELETE TASK DIALOG ----------------*/}
      <Dialog open={deleteDialogOpen}>
        <div className="flex flex-col items-center bg-white dark:bg-primaryBlue p-8 rounded-lg">
          <Logo />

          <div className="mt-4 mb-6">
            <h2 className="font-medium text-gray-500 text-lg">
              Are you sure, you want to delete this task?
            </h2>
          </div>
          <div className="flex justify-end items-center gap-5">
            <Button
              label={isLoading ? <Loader size={'small'} /> : 'Delete'}
              disabled={isLoading}
              size={'small'}
              onClick={deleteTask}
            />
            <Button
              label={'Cancel'}
              disabled={isLoading}
              size={'small'}
              onClick={(e) => {
                e.preventDefault();
                setDeleteDialogOpen(false);
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TaskCard;
