import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import testlogo from "../../Style/Image/testlogo.svg";
import "./LoginPage.scss";
import {
  AiOutlineEye,
  AiFillApple,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { loginUser } from "../../rudex/apiRequest";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginPage = (props) => {
  let history = useHistory();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClickPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleCreateNewAccout = () => {
    history.push("./SignupPage");
  };

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    loginUser(newUser, dispatch, history);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="content-left col-12 col-md-3 col-lg-4 d-none d-sm-block"></div>
            <div className="content-center col-12 col-sm-8 col-md-6 col-lg-4  col-xl-3  text-center ">
              <img src={testlogo} className="logo" alt="logo" />
              <div className="content d-flex flex-column gap-3 py-3">
                <div className="brand">
                  <h1>TotMusica</h1>
                </div>
                <input
                  type="text"
                  className="input-custom "
                  placeholder="Email"
                  onChange={(e) => setemail(e.target.value)}
                />
                <div className="input-password ">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className="input-custom "
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span onClick={handleClickPassword}>
                    {passwordVisible ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </div>
                <button className="btn button-login">Log in</button>
                <span
                  className="text-center"
                  onClick={() => history.push("./forgotpassword")}
                >
                  <a className="forgot-password" href="#">
                    Forgot your password ?
                  </a>
                </span>
                {/* <button type="submit" className="btn btn-login-apple">
                  <span>
                    <FcGoogle />
                  </span>
                  <span>Continue with Google</span>
                </button> */}
                <span className="text-center">
                  Need an account?
                  <a
                    className="forgot-password"
                    onClick={() => handleCreateNewAccout()}
                  >
                    {" "}
                    Sign up
                  </a>
                </span>
              </div>
            </div>
            <div className="content-right col-12 col-md-3 col-lg-4 d-none d-sm-block"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
