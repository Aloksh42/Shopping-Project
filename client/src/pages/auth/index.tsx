import axios from "axios";
import { useContext, useState } from "react";
import { UserErrors } from "../../models/errors";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { IShopContext, ShopContext } from "../../context/shop-context";

export const AuthPage = () => {
  return (
    <div className="auth">
      <Register />
      <Login />
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [_, setCookies] = useCookies(["access_token"]);
  const {setIsAuthenticated} = useContext<IShopContext>(ShopContext)

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");

    } catch (error) {
      let errorMessage: string = "";
      switch (error?.response?.data?.type) {
        case UserErrors.NO_USER_FOUND:
          errorMessage = "User Doesn't Exist";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong Username/Password combination";
          break;
        default:
          errorMessage = "Something went wrong";
      }
      alert("Error: " + errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      alert("Registration completed , Now Login");
    } catch (error) {
      if (error?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("User Already in use! ");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

