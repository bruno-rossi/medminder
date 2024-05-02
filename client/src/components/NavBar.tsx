import { NavLink, Link, useNavigate } from "react-router-dom";

function NavBar() {

    const navigate = useNavigate();

    return (
        <div id="navbar">
            <NavLink className="navlink logo" to={'/'}>Medminder</NavLink>
            <ul className="navbar-ul">
                <li className="navbar-li secondary" onClick={() => navigate('/login/')}>Log in</li>
                <li className="navbar-li primary" onClick={() => navigate('/signup/')}>Sign up</li>
            </ul>
        </div>
    )
}

export default NavBar;