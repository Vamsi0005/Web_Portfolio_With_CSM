import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, getMe } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('admin_access_token'));
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(accessToken && user);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('admin_access_token');
      if (token) {
        try {
          const res = await getMe();
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('admin_user', JSON.stringify(res.data));
          }
        } catch (err) {
          console.warn('Session verification failed:', err.message);
          // Token will be refreshed or redirected by axios interceptor
        }
      }
      setLoading(false);
    };

    verifyAuth();
  }, []);

  const loginUser = async ({ email, password }) => {
    const res = await apiLogin({ email, password });
    if (res.data) {
      const { user: userData, accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;
      
      setUser(userData);
      setAccessToken(newAccessToken);

      localStorage.setItem('admin_user', JSON.stringify(userData));
      localStorage.setItem('admin_access_token', newAccessToken);
      localStorage.setItem('admin_refresh_token', newRefreshToken);

      return userData;
    }
  };

  const logoutUser = async () => {
    try {
      await apiLogout();
    } catch (e) {
      // Ignore network errors during logout
    } finally {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_access_token');
      localStorage.removeItem('admin_refresh_token');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        loading,
        loginUser,
        logoutUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
