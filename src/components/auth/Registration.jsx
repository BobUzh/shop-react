import { useState } from "react";


const Registration = () => {
    const [username, setUsername] = useState(() => '');
    const [email, setEmail] = useState(() => '');
    const [firstname, setFirstname] = useState(() => '');
    const [lastname, setLastname] = useState(() => '');
    const [password, setPassword] = useState(() => '');
    const [loading, setLoading] = useState(() => false);
    const [message, setMessage] = useState(() => '');

    const submit = () => {

    };

    return (
        <>
            <div className="auth">
                <div className="auth_form">

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
                        <input id="firstname" type="text" placeholder="firstname" name="firstname"
                               value={firstname}
                               onChange={e => setFirstname(e.target.value)}/>
                    </div>
                    <div className="input_group">
                        <label htmlFor="lastname">lastname</label>
                        <input id="lastname" type="text" placeholder="lastname" name="lastname"
                               value={lastname}
                               onChange={e => setLastname(e.target.value)}/>
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

export default Registration;