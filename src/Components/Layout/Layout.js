import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { LayoutWrapper, ContentWrapper } from './Layout.style';

const Layout = ({ children }) => {
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
