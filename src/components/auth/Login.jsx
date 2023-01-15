import { useState } from "react";
import { login } from '../../api/Auth';
import { userStore } from "../../store/userStore";

import './auth.scss'


const Login = () => {
    const [username, setUsername] = useState(() => '');
    const [password, setPassword] = useState(() => '');
    const [loading, setLoading] = useState(() => false);
    const [message, setMessage] = useState(() => '');

    const submit = async () => {
        if (message) {
            setMessage('');
        }
        setLoading(true);

        try {
            const res = await login({username, password});
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            userStore.setAuthorize(true);
        } catch (e) {
            console.log(e);
            userStore.setAuthorize(false);
            setMessage(e.response.data);
        } finally {
            setLoading(false);
        }

    };

    

    const spiner = (
        <div className="mask">
            loading...
        </div>
    );

    const dataMessage = (
        <div className="error">
            <h2>{message}</h2>
        </div>
    );

    return (
        <>
            <div className="auth">
                <div className="auth_form">
                    {loading && spiner}
                    <span>Login</span>
                    <div className="input_group">
                        <label htmlFor="username">username</label>
                        <input id="username" type="text" placeholder="username" name="username"
                               value={username}
                               onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="input_group">
                        <label htmlFor="password">password</label>
                        <input id="password" type="password" placeholder="password" name="password"
                               value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="input_group btn">
                        <button className="auth_btn_send" type="button" onClick={submit}>Send</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;