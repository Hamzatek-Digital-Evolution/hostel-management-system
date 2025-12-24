
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    document.title = 'Hostel Management System';
  }, []);

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
