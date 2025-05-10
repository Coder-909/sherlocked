import React,{useContext,useState} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {UserContext} from "../App.jsx"


const NavBar = () => {
    const navigate = useNavigate();
    const [user,setUser] = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = localStorage.getItem('token');
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const logout = async() => {
        setUser({});
        localStorage.removeItem('token');
        navigate('/');
    }

    const dom = () => {
        if(user.user?.role === "admin"){
            return (
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
            )
        }else{
            return (
                <li><Link to="/">Home</Link></li>
            )
        }
    }

    return (
        <div id="NavBar">
            <h1 onClick={() => {navigate('/')}}>Sherlocked</h1>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                {dom()}
                <li><Link to="/about">About</Link></li>
                {!token && <li><Link to="/login">Login</Link></li>}
                {token && <li><button onClick={logout}>Logout</button></li>}
            </ul>
            <div className="burger" onClick={toggleMenu}>
                <div className="bar"/>
                <div className="bar"/>
                <div className="bar"/>
            </div>
        </div>
    )
}

export default NavBar
