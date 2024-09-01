import React from 'react';
import Loader from './Loader';
import classNames from 'classnames';

const Button = ({
  disabled,
  onClick,
  label,
  isLoading,
  size,
  type,
  variant,
  fullWidth,
  color,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={classNames(
        'space-x-1 bg-formButton rounded h-[38px] text-sm text-white',
        {
          'w-full': fullWidth,
          'cursor-not-allowed bg-gray-400': disabled,
          'w-24': size === 'small',
          'w-[368px]': !size,
          'bg-formButton text-white':
            !variant || variant === 'contained' || !color,
          [`text-${color} border-${color}`]: variant === 'outlined' && color,
          // "bg-formButton text-white": variant === "contained" && color,
        }
      )}
    >
      {isLoading ? <Loader size={'small'} /> : label}
    </button>
  );
};

export default Button;
