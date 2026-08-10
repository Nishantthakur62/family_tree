import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { LayoutWrapper, ContentWrapper } from './Layout.style';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      <Header />
      <LayoutWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </LayoutWrapper>
      <Footer />
    </>
  );
};

export default Layout;
