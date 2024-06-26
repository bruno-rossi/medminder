import { useState } from "react";
import { useNavigate, NavigateFunction, useOutletContext } from "react-router-dom";
import { UserData } from '../types/types';

function Login(): JSX.Element {

    const { setUser }: { setUser: (user: UserData | null) => void } = useOutletContext();

    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const navigate: NavigateFunction = useNavigate();

    function handleSubmit(event: React.FormEvent<EventTarget | HTMLFormElement>) {
        event.preventDefault();

        fetch("http://127.0.0.1:5555/login/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error('Failed to log in');
            };
        })
        .then((data) => {
            setUser(data);
            navigate("/");
            
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    return (
        <div id="login">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <fieldset>
                    <label className="input-label" htmlFor="email-input">Email:</label>
                    <input className="form-input" id="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                    <label className="input-label" htmlFor="password-input">Password:</label>
                    <input className="form-input" id="password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                </fieldset>
                <button className="primary" type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login