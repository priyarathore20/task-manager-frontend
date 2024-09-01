import classNames from 'classnames';
import React from 'react';

const Input = ({
  placeholder,
  onChange,
  type,
  label,
  value,
  disabled,
  fullWidth,
  error,
  maxLength,
  textarea,
  ...props
}) => {
  return (
    <div
      className={classNames('flex mb-1 flex-col', {
        'w-full': fullWidth === true,
      })}
    >
      {label && (
        <label className="text-grayHeading text-lg dark:text-white/75">
          {label}
        </label>
      )}
      {!textarea ? (
        <input
          maxLength={maxLength}
          placeholder={placeholder}
          value={value}
          {...props}
          type={type}
          onChange={onChange}
          className={classNames(
            'dark:text-white/75 rounded-lg pl-3 text-black outline-none bg-transparent border border-cardSubTitle py-2 px-1',
            {
              'bg-gray-100 text-gray-400 cursor-not-allowed': disabled,
              'border border-red/95': error,
            }
          )}
        />
      ) : (
        <textarea
          maxLength={maxLength}
          rows={4}
          placeholder={placeholder}
          value={value}
          {...props}
          type={type}
          onChange={onChange}
          className={classNames(
            'dark:text-white/75 resize-none rounded-lg pl-3 text-black outline-none bg-transparent border border-cardSubTitle py-2 px-1',
            {
              'bg-gray-100 text-gray-400 cursor-not-allowed': disabled,
              'border border-red/95': error,
            }
          )}
        />
      )}
      <p className={`mt-2 text-red/95 text-sm ${error ? 'block' : 'hidden'}`}>
        This field is required
      </p>
    </div>
  );
};

export default Input;
