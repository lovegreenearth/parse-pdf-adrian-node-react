import React from 'react';
import { Link } from 'react-router-dom';
// import { LazyLoadImage } from 'react-lazy-load-image-component';

const Header = () => {
    return (
        <header>
            <div className='top-header'>
                <div className='header-logo'>
                    MayaTravel
                </div>
                <div className='user-mode'>
                    <div className='auth-link'>
                        <Link to={'/signin'}>
                            SignIn
                        </Link>
                        {'/'}
                        <Link to={'/signup'}>
                            SignUp
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
