import React from 'react';
import Footer from '../components/layout/Footer';

const Layout = ({ children }) => (
    <React.Fragment>
        <div className="">
            {children}
        </div>
        <Footer />
    </React.Fragment>
);

export default Layout;