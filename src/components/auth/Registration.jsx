import { useState } from "react";
import { registration } from '../../api/Auth';


const Registration = () => {
    const [username, setUsername] = useState(() => '');
    const [email, setEmail] = useState(() => '');
    const [first_name, setFirstname] = useState(() => '');
    const [last_name, setLastname] = useState(() => '');
    const [password, setPassword] = useState(() => '');
    const [password2, setPassword2] = useState(() => '');
    const [loading, setLoading] = useState(() => false);
    const [message, setMessage] = useState(() => '');

    const submit = async () => {
        if (message) {
            setMessage('')
        }
        setLoading(true);

        try {
            const data = await registration({username, password, password2, email, first_name, last_name});
        } catch (e) {
            console.log(e)
            if (e.response?.status === 409) {
                setMessage(e.response.data);
            } else {
                setMessage('Bad request');
            }
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
                    <span>Registration</span>
                    <div className="input_group">
                        <label htmlFor="usename">username</label>
                        <input id="usename" type="text" placeholder="username" name="usename"
                               value={username}
                               onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="input_group">
                        <label htmlFor="email">email</label>
                        <input id="email" type="text" placeholder="email" name="email"
                               value={email}
                               onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="input_group">
                        <label htmlFor="firstname">firstname</label>
                        <input id="first_name" type="text" placeholder="firstname" name="firstname"
                               value={first_name}
                               onChange={e => setFirstname(e.target.value)}/>
                    </div>
                    <div className="input_group">
                        <label htmlFor="last_name">lastname</label>
                        <input id="lastname" type="text" placeholder="lastname" name="lastname"
                               value={last_name}
                               onChange={e => setLastname(e.target.value)}/>
                    </div>
                    <div className="input_group">
                        <label htmlFor="password">password</label>
                        <input id="password" type="password" placeholder="password" name="password"
                               value={password}
                               onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="input_group">
                        <label htmlFor="password2">password2</label>
                        <input id="password2" type="password" placeholder="password2" name="password2"
                               value={password2}
                               onChange={e => setPassword2(e.target.value)}/>
                    </div>
                    <div className="input_group btn">
                        <button className="auth_btn_send" type="button" onClick={submit}>Send</button>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Registration;