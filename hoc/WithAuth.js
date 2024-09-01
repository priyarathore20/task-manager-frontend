import Loader from '@/components/Loader';
import { notAuthenticatedRoutes } from '@/data';
import useAuthenticationStatus from '@/hooks/useAuthenticationStatus';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function withAuth(Component) {
  return function AuthProtected(props) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();
    const pathname = usePathname();

    // console.log(pathname);

    if (isLoading) {
      return (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader />
        </div>
      );
    }

    // console.log(isLoading, isAuthenticated, pathname);

    if (isAuthenticated && notAuthenticatedRoutes.includes(pathname)) {
      return router.replace('/');
    }

    if (!isAuthenticated && !notAuthenticatedRoutes.includes(pathname)) {
      return router.replace('/login');
    }

    return <Component {...props} />;
  };
}
