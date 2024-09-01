'use client';

import classNames from 'classnames';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IoMdClose } from 'react-icons/io';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: '',
    variant: 'success',
  });
  const timerRef = useRef(null);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, show: false }));
  };

  const showSnackbar = useCallback((message, variant = 'success') => {
    setSnackbar({ show: true, message, variant: variant });

    // Clear the existing timer if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a new timer to hide the snackbar after 3 seconds
    timerRef.current = setTimeout(() => {
      handleSnackbarClose();
      timerRef.current = null;
    }, 5000);
  }, []);

  useEffect(() => {
    // Clean up the timer when the component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}

      <div
        className={classNames(
          'transition-transform bottom-8 text-white left-8 fixed flex justify-between gap-2 items-center shadow-md min-h-[48px] max-w-[50vw] p-4 rounded-lg min-w-[300px] text-sm z-50',
          {
            ['bg-successBg ']: snackbar?.variant === 'success',
            ['bg-errorBg ']: snackbar?.variant === 'error',
            ['-translate-x-[200%]']: !snackbar?.show,
            ['translate-x-0']: snackbar?.show,
          }
        )}
      >
        {snackbar?.message}
        <IoMdClose
          size={'20'}
          className="cursor-pointer"
          onClick={handleSnackbarClose}
        />
      </div>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
