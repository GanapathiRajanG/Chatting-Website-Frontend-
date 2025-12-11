import "./../Style/login.css";
const Login = () => {
  return (
    <div className="login">
      <form className="loginForm">
        <h2>Login Page</h2>
        <label>Email</label>
        <input type="email" placeholder="Email" required></input>
        <label>Password</label>
        <input type="password" placeholder="Password" required></input>
        <button className="loginButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;