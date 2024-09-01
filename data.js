import { FaRegEye } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';

export const sidebarLinks = [
  {
    category: 'Tasks',
    links: [
      {
        name: 'Dashboard',
        href: '/',
        icon: FaRegEye,
      },
      { name: 'Add a Task', href: '/add-task', icon: IoAddCircleOutline },
    ],
  },
  {
    category: 'Personal',
    links: [
      // { name: "Logout", href: "", icon: TbLogout2, onclick: LogoutUser },
    ],
  },
];

export const addTask = [
  { label: 'Title:' },
  { label: 'Description:' },
  { label: 'Due Date:' },
  { label: 'Status:' },
];

export const notAuthenticatedRoutes = ['/login', '/signup'];
