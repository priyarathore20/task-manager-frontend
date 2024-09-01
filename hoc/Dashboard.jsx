import Sidebar from '@/components/Sidebar';
import React from 'react';

const Dashboard = ({ children }) => {
  return (
    <div className="flex bg-bgLight dark:bg-secondaryBlue w-screen h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
