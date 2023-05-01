import { useContext,useState } from "react";
import {Navigate} from "react-router-dom";
import { UserContext } from "../UserContext";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);
    async function register(ev) {
        ev.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials:'include',
            });

            if(response.ok) {
                response.json().then(userInfo =>{
                    setRedirect(true);
                    setUserInfo(userInfo);
                })
            }
        } catch (e) {
            alert('registration failed')
        }
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text"
                placeholder="user name"
                value={username}
                onChange={ev => setUsername(ev.target.value)}>
            </input>
            <input type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}>
            </input>
            <button>Register</button>
        </form>
    )
}