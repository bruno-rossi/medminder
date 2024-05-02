import { NavLink, useNavigate } from "react-router-dom";
import { UserData, NavBarProps } from '../types/types';  

function NavBar({ user, setUser }: NavBarProps) {

    const navigate = useNavigate();

    function handleLogOut() {
        fetch(`http://127.0.0.1:5555/logout`, {
            method: 'DELETE',
            credentials: 'include',
        })
        .then(response => { if (response.ok) {
            setUser(null);
            navigate('/login');
        }})
    }
    console.log(user);

    return (
        <div id="navbar">
            <NavLink className="navlink logo" to={'/'}>Medminder</NavLink>
            {user ? (
                <ul className="navbar-ul">
                    <p>Welcome, {user.first_name}</p>
                    <li className="navbar-li primary" onClick={handleLogOut}>Log out</li>
                </ul>
            ) : (
                <ul className="navbar-ul">
                    <li className="navbar-li secondary" onClick={() => navigate('/login/')}>Log in</li>
                    <li className="navbar-li primary" onClick={() => navigate('/signup/')}>Sign up</li>
                </ul>
            )}
        </div>
    )
}

export default NavBar;