import React,{useContext} from 'react'
import {Link} from 'react-router-dom';
import {UserContext} from "../App.jsx"

const NavBar = () => {
    const [user,setUser] = useContext(UserContext);
    const logout = async() => {
        await fetch('{logout route}',{
            method:'POST',
            credentials:'include',
        })
        setUser({});
        navigate('/');
    }

    return (
        <div id="NavBar">
            <h1>Sherlocked</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {!user.accesstoken && <li><Link to="/login">Login</Link></li>}
                {user.accesstoken && <li><button onClick={logout}>Logout</button></li>}
            </ul>
        </div>
    )
}

export default NavBar
