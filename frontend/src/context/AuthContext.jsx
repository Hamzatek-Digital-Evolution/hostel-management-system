import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Auto-logout configuration (minutes)
  const idleMinutes = Number(import.meta.env.VITE_AUTO_LOGOUT_MINUTES) || 15;
  const idleTimeoutMs = idleMinutes * 60 * 1000;

  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    if (!token) return;
    clearTimer();
    timerRef.current = setTimeout(() => {
      // perform auto logout
      setUser(null);
      setToken(null);
      localStorage.clear();
      toast.info('You have been logged out due to inactivity');
      navigate('/login');
    }, idleTimeoutMs);
  };

  const resetTimer = () => {
    // reset when user interacts
    startTimer();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
    // setup activity listeners to reset timer
    const events = ['mousemove', 'keydown', 'click', 'touchstart'];
    events.forEach((ev) => document.addEventListener(ev, resetTimer));

    // start timer if authenticated will be handled in token effect

    return () => {
      // cleanup
      clearTimer();
      events.forEach((ev) => document.removeEventListener(ev, resetTimer));
    };
  }, []);

  // whenever token changes, start or clear timer
  useEffect(() => {
    if (token) {
      startTimer();
    } else {
      clearTimer();
    }

    return () => clearTimer();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    setUser(res.data.user);
    setToken(res.data.token);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);

    // start inactivity timer on login
    startTimer();

    return res.data.user.role;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    toast.info('Logged out');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
        isAdmin: user?.role === "ADMIN",
        isStudent: user?.role === "STUDENT",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
