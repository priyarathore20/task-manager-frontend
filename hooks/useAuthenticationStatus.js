import { AuthContext } from '@/context/UserContext';
import { jwtDecode } from 'jwt-decode';
import { useContext, useEffect, useState } from 'react';

const useAuthenticationStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setWebUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
    } else {
      const user = jwtDecode(token);
      setWebUser(user ?? null);

      // The timestamp to check (in seconds)
      const timestamp = user?.exp;

      // Get the current timestamp (in seconds)
      const currentTimestamp = Math.floor(Date.now() / 1000);

      // Check if the timestamp is in the past (expired)
      const isExpired = timestamp < currentTimestamp;

      if (isExpired) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuthenticationStatus;
