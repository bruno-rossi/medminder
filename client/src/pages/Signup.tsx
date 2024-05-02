import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

interface SignupData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

function Signup(): JSX.Element {

    const [ email, setEmail ] = useState<string>("");
    const [ firstName, setFirstName ] = useState<string>("");
    const [ lastName, setLastName ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ confirmPassword, setConfirmPassword ] = useState<string>("");

    const navigate: NavigateFunction = useNavigate();

    function handleSubmit(event: React.FormEvent<EventTarget | HTMLFormElement>) {

        event.preventDefault();

        if (password === confirmPassword) {

            fetch("http://127.0.0.1:5555/signup/", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                    password: password
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 409) {
                    throw new Error('Failed to create user');
                };
            })
            .then(() => {
                // Handle response data if needed
                navigate('/login/');
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <div id="signup">
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name"></input>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name"></input>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password"></input>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;