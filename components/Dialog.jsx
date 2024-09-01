import classNames from 'classnames';
import React from 'react';

const Dialog = ({ open, onClose, children }) => {
  return (
    <div
      className={classNames(
        'fixed top-0 left-0 justify-center items-center h-full w-full z-50',
        {
          ['hidden']: !open,
          ['flex']: open,
        }
      )}
    >
      <div
        className="top-0 left-0 z-30 fixed bg-black opacity-50 w-full h-full"
        onClick={onClose}
      ></div>
      <div
        className={classNames(
          'z-40 relative max-h-[85%] px-5 overflow-x-hidden overflow-y-auto'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
