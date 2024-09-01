import { CgProfile } from 'react-icons/cg';
import { FaRegEye } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';
import BirdImg from './public/bird.jpg';
import CamelImg from './public/camel.jpg';
import CatImg from './public/cat.jpg';
import CowImg from './public/cow.jpg';
import DogImg from './public/dog.webp';
import HorseImg from './public/horse.jpg';
import SnakeImg from './public/snake.png';

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
