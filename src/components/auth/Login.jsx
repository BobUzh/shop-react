import { useState } from "react";

import './auth.scss'


const Login = () => {
    const [email, setEmail] = useState(() => '');
    const [password, setPassword] = useState(() => '');
    const [loading, setLoading] = useState(() => false);
    const [message, setMessage] = useState(() => '');

    const submit = () => {

    };

    return (
        <>
            <div className="auth">
                <div className="auth_form">
                    <span>Login</span>
                    <div className="input_group">
                        <label htmlFor="email">email</label>
                        <input id="email" type="text" placeholder="email" name="email"
                               value={email}
                               onChange={e => setEmail(e.target.value)}/>
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