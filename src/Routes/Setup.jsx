import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignInPage from '../Authentications/LoginPage';
import SignUpPage from '../Authentications/SignupPage';
import NavBar from '../Components/page-components/NavBar';
import SearchTurorial from '../pages/Home/SearchTutorial';
import SideBar from '../Components/page-components/SideBar';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location])
  return (
    <>
      <NavBar />
      <SideBar />
      <motion.div
        initial={{ opacity: 0, overflow: 'hidden', y: 500 }}
        animate={{ opacity: 1, overflow: 'auto', y: 0 }}
        transition={{ duration: 1, ease: 'easeIn' }}
        style={{
          marginLeft: 'calc(100%/5)',
          padding: '40px 20px'
        }}>
        {children}
      </motion.div>
    </>
  );
}

const AuthLayout = ({ children }) => (
  <>
    {children}
  </>
);

const Setup = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route path='/' element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
          />
          <Route path='/completed' element={
            <MainLayout>
              <SearchTurorial />
            </MainLayout>
          }
          />
          <Route path='/todo' element={
            <MainLayout>
              <h1>To Do List</h1>
            </MainLayout>
          }
          />
          <Route path='/completed' element={
            <MainLayout>
              <h1>Completed List</h1>
            </MainLayout>
          }
          />
          <Route path='/search' element={
            <MainLayout>
              <SearchTurorial />
            </MainLayout>
          }
          />
          <Route
            path='/login'
            element={
              <AuthLayout>
                <SignInPage />
              </AuthLayout>
            }
          />
          <Route
            path='/signup'
            element={
              <AuthLayout>
                <SignUpPage />
              </AuthLayout>
            }
          />
        </Routes>
      </>

    </Router>
  );
};

export default Setup;
