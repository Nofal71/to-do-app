import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignInPage from '../Authentications/LoginPage';
import SignUpPage from '../Authentications/SignupPage';
import NavBar from '../Components/page-components/NavBar';
import SideBar from '../Components/page-components/SideBar';
import { motion } from 'framer-motion';
import ListHead from '../Components/page-components/ListHead';
import ListComponent from '../Components/page-components/ListComponent';
import useList from '../redux/Providers/ListProviders';
import { Typography } from '@mui/material';

const MainLayout = ({ children }) => {
  const location = useLocation()
  const navigator = useNavigate()
  const { currentList } = useList()
  const [isMobile, setMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  useEffect(() => {
    if (currentList?.length === 1) {
      currentList[0].path !== decodeURIComponent(location.pathname?.slice(1)).replace(/%20/g, ' ') && navigator(currentList[0].path)
    }
  }, [location, currentList])
  return (
    <>
      <NavBar />
      <SideBar />
      <motion.div
        initial={{ opacity: 0, overflow: 'hidden', y: 500 }}
        animate={{ opacity: 1, overflow: 'auto', y: 0 }}
        transition={{ duration: 1, ease: 'easeIn' }}
        style={{
          marginLeft: !isMobile && 'calc(100%/5)',
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

const ListLayout = ({ listData }) => {

  return (
    <MainLayout>
      <ListHead />
      <ListComponent list={listData} />
    </MainLayout>
  );
}


const Setup = () => {
  const { currentList } = useList()
  return (
    <Router>
      <>
        <Routes>
          {
            currentList?.length === 0 ? (
              <Route
                path='/'
                element={
                  <MainLayout>
                    <Typography variant='h4' align='center' color='primary' p={5}>No List Found..!</Typography>
                  </MainLayout>
                }
              />
            ) : (
              <Route
                path='/'
                element={<ListLayout listData={currentList[0].data} />}
              />
            )
          }

          {
            currentList && currentList.map((item, index) => (
              <Route
                key={index}
                path={item?.path}
                element={<ListLayout listData={item?.data} />}
              />
            ))
          }

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
