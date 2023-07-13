const LoginForm = ({ username, setUsername, password, setPassword, submitEvent }) => {
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={submitEvent}>
                <div>
                        username:&nbsp;
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password:&nbsp;
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit" id="login-button"style={{ width: "250px", }}>login</button>
            </form>
        </div>
    )

}

export default LoginForm