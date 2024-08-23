import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData } from './storage';
import { LoginUserData } from '../screens/login/type';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [isCustomer, setUserRole] = useState(false); 

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getData('token');
        setIsAuthenticated(!!token); 
        if(token){
        const role: LoginUserData = jwtDecode(token??'');
        setUserRole(role.Role == 'customer')
        }
        
      } catch (error) {
        console.error('Error checking token:', error);
        setIsAuthenticated(false); // Default to false on error
      } finally {
        setLoading(false); // Set loading to false after check
      }
    };

    checkToken();
  }, []);

  return { isAuthenticated, loading, isCustomer };
};

export default useAuth;
