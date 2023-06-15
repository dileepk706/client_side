import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css';
import Home from './pages/user/home';
import Profile from './pages/user/profile';
import Header from './components/Header';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { isLogin } from './features/authenticationSlicer';
import AdminHome from './pages/admin/AdminHome';
import { isAdmin } from './features/adminSlicer';
import AdminLoginPage from './pages/admin/Login';

function App() {
  const IsLogin = useSelector((state) => state.auth.isLogin);
  const IsAdmin = useSelector((state) => state.adminAuth.isAdmin);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const isAdminApi = async () => {
    try {
      const res = await axios.get('http://localhost:3001/admin/api/verify', {
        headers: {
          authorization: localStorage.getItem('adminToken'),
        },
      });
      const data = await res.data;
      console.log('log from admin reducer');
      console.log(data);
      if (data.admin === true) {
        dispatch(isAdmin(true));
      } else {
        dispatch(isAdmin(false));
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the user is logged in and verify admin status
  useEffect(() => {
    dispatch(isLogin());
    isAdminApi();
  }, []);

  console.log('from admin', IsAdmin);

  // Render loading state while verifying admin status
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/profile"
          element={IsLogin ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={IsAdmin ? <AdminHome /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={!IsAdmin?<AdminLoginPage />:<Navigate to='/'/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
