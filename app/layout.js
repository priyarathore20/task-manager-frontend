import { SnackbarProvider } from '@/context/SnackbarProvider';
import AuthContextProvider from '@/context/UserContext';
import { Public_Sans } from 'next/font/google';
import './globals.css';

const public_sans = Public_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Task manager',
  description:
    'Task Manager is your go-to app for managing tasks, staying organized, and maximizing productivity—all in one place!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" id="html-tag">
      <body className={public_sans.className}>
        <AuthContextProvider>
          <SnackbarProvider>{children} </SnackbarProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
