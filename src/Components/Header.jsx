import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProviders';

const Header = () => {
    const { user , logout } = useContext(AuthContext);

    const handleLogOut =()=>{
        logout()
        .then(()=>{})
        .catch(error => console.log(error))
    }
    
    return (
        <div>
            <div className="navbar bg-base-300">
                <a className="btn btn-ghost normal-case text-xl">Mastering Auth</a>
                <Link className="btn btn-ghost normal-case text-xl" to="/">Home</Link>
                <Link className="btn btn-ghost normal-case text-xl" to="/orders">Orders</Link>
                <Link className="btn btn-ghost normal-case text-xl" to="/login">Login</Link>
                <Link className="btn btn-ghost normal-case text-xl" to="/register">Register</Link>
                {
                    user? <>
                    <span>{user.email}</span> 
                    <button onClick={handleLogOut} className="btn btn-xs">Sign out</button>
                    </>: <Link to="/login">Login</Link>
                }

            </div>
        </div>
    );
};

export default Header;