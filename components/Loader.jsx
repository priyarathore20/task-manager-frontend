import classNames from 'classnames';
import React from 'react';

const Loader = ({ size }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={classNames(
          'rounded-full border-t-white border-formButton animate-spin',
          {
            'h-5 w-5 border-2 border-t-formButton border-white':
              size === 'small',
            'h-16 w-16 border-8': !size || size === 'large',
          }
        )}
      ></div>
    </div>
  );
};

export default Loader;
