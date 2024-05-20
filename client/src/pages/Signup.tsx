import { useState } from "react";
import { Link, useNavigate, NavigateFunction } from "react-router-dom";

interface SignupData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

function Signup(): JSX.Element {

    console.log(window.navigator.language);

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
        <div className="main-section" id="signup">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h1>Welcome!</h1>
                <fieldset>
                    {/* <legend>What's your name?</legend> */}
                    <label className="input-label" htmlFor="first-name-input">First name</label>
                    <input className="form-input" id="first-name-input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required></input>

                    <label className="input-label" htmlFor="last-name-input">Last name</label>
                    <input className="form-input" id="last-name-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required></input>
                </fieldset>
                <fieldset>
                    <label className="input-label" htmlFor="email-input">Email:</label>
                    <input className="form-input" id="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required></input>
                    
                    <label className="input-label" htmlFor="password-input">Password:</label>
                    <input className="form-input" id="password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required></input>

                    <label className="input-label" htmlFor="confirm-password-input">Confirm password:</label>
                    <input className="form-input" id="confirm-password-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required></input>
                </fieldset>
                {/* <fieldset>
                    <legend>Settings</legend>
                    <label className="input-label" htmlFor="language-input">Language:</label>
                    <input className="form-input" id="language-input" value={window.navigator.language}></input>
                    <label className="input-label" htmlFor="timezone-input">Timezone:</label>
                    <input className="form-input" id="timezone-input"></input>
                </fieldset> */}
                <fieldset>
                        <label><input type="checkbox" /><span className="legal-disclaimer">By clicking Submit, you agree to our Terms and Conditions and Privacy Policy.</span></label>
                </fieldset>
                <button className="primary" type="submit">Create account</button>
                <p>Already have an account? <Link to="/login/">Log in</Link></p>
            </form>
        </div>
    )
}

export default Signup;