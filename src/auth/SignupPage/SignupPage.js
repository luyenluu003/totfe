import "./SignupPage.scss";
import react, { useState } from "react";
import { useHistory } from "react-router-dom";
import testlogo from "../../Style/Image/testlogo.svg";
import {
  AiOutlineEye,
  AiFillApple,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { checkEmailExistence, registerUser } from "../../rudex/apiRequest";
import { ReceiveCode } from "../../rudex/apiRequest";
import { ConfirmCode } from "../../rudex/apiRequest";
import { toast } from "react-toastify";
const SignupPage = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const defaultValidInput = {
    isValidEmail: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfimPassword: true,
  };
  const dispatch = useDispatch();
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  let history = useHistory();

  const handleClickPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!email) {
      toast.error("Email is required!");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      toast.error("Please enter a vaild email address!");
      return false;
    }
    if (!username) {
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
      toast.error("Username is required!");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required!");
      return false;
    }
    if (password !== confimPassword) {
      setObjCheckInput({ ...defaultValidInput, isValidConfimPassword: false });
      toast.error("Your password is not the same!");
      return false;
    }
    return true;
  };

  //email
  const handleReceiveCode = async (e) => {
    let check = isValidInputs();
    if (check === true) {
      try {
        const isEmailExist = await checkEmailExistence(email);
        if (!isEmailExist) {
          // Gửi mã xác nhận nếu email chưa đang ký
          e.preventDefault();
          ReceiveCode(email)
            .then((data) => {
              alert(data);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          toast.error("Email đã tồn tại");
        }
      } catch (error) {
        console.error(error);
        toast.error("Có lỗi xảy ra khi kiểm tra email");
      }
    }
  };

  const handleConfirmCode = (e) => {
    e.preventDefault();
    ConfirmCode(email, verificationCode)
      .then((data) => {
        alert(data);
        if (data === "Xác nhận thành công.") {
          setIsEmailVerified(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //Register
  const handleRegister = (e) => {
    e.preventDefault();
    let check = isValidInputs();
    if (check === true && isEmailVerified) {
      toast.success("Registration in successfully!");
      const newUser = {
        email: email,
        password: password,
        username: username,
      };
      registerUser(newUser, dispatch, history);
    }
  };
  return (
    <div className="signup-container">
      <form onSubmit={handleRegister}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="content-left col-12 col-md-3 col-lg-4 d-none d-sm-block"></div>
            <div className="content-center col-12 col-sm-8 col-md-6 col-lg-4  col-xl-3  text-center ">
              <img src={testlogo} className="logo" alt="logo" />
              <div className="content d-flex flex-column gap-3 py-3">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className={
                    objCheckInput.isValidUsername
                      ? "input-custom"
                      : "input-custom is-invalid"
                  }
                />
                <div className="input-password ">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className={
                      objCheckInput.isValidPassword
                        ? "input-custom"
                        : "input-custom is-invalid"
                    }
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
                <div className="input-password ">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    className={
                      objCheckInput.isValidConfimPassword
                        ? "input-custom"
                        : "input-custom is-invalid"
                    }
                    placeholder="Enter the password"
                    onChange={(e) => setConfimPassword(e.target.value)}
                  />
                  <span onClick={handleClickPassword}>
                    {passwordVisible ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </div>
                <div className="input-email">
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={
                      objCheckInput.isValidEmail
                        ? "input-custom"
                        : "input-custom is-invalid"
                    }
                  />
                  <button className="receive-code" onClick={handleReceiveCode}>
                    Receive
                  </button>
                </div>
                <div className="confirm-email">
                  <input
                    type="text"
                    className="input-custom "
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Confirmation code"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleConfirmCode}
                  >
                    Cofirm
                  </button>
                </div>
                <button className="btn button-register">Register</button>
              </div>
            </div>
            <div className="content-right col-12 col-md-3 col-lg-4 d-none d-sm-block"></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
