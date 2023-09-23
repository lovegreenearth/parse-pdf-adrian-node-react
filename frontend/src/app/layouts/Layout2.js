import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import UserContext from '../utils/UserContext';

const Header = () => {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("token", "");
        localStorage.setItem("role", "");
        history.push("/signin");
    };

    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(!token) {
            setIsLogged(false);
        }else{
            setIsLogged(true);
        }
        let role = localStorage.getItem('role');
        // console.log(role)
        if(role == 'admin') {
            setIsAdmin(true);
        }else{
            setIsAdmin(false);
        }
    }, []);

    return  <header>
                <div className='top-header'>
                    <div className='header-logo'>
                        <h1>
                            MayaTravel
                        </h1>
                    </div>
                    <div className='user-mode'>
                        <Link to={'/tickets'} className='contact-us auth-link'>
                            Ticket
                        </Link>
                        <Link to={'/'} className='contact-us auth-link'>
                            Home
                        </Link>
                        <div className='auth-link'>
                            <a onClick={logout}>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </header>;
           
}

const Footer = () => {
    return <div className="footer">
                Copyright @ 2023 developed by MayaTravel
            </div>;
}

const Layout2 = ({ children }) => (
    <React.Fragment>
        {
            Header()
        }
        <div className="content">
            {children}
        </div>
        {
            Footer()
        }
    </React.Fragment>
);

export default Layout2;