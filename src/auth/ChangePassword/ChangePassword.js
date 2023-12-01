import React, { useState } from "react";
import "./ChangePassword.scss";
import testlogo from "../../Style/Image/testlogo.svg";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useContext } from "react";
import { changePasswordService } from "../../rudex/apiRequest";
const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  let history = useHistory();

  const defaultValidInput = {
    isValidPassword: true,
    isValidConfimPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
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
  const handleClickPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  const changePassword = async (e) => {
    e.preventDefault();
    let check = isValidInputs();
    if (check) {
      const newPassword = {
        newPassword: password,
      };
      console.log("newPassword:", newPassword);

      try {
        const response = await changePasswordService(newPassword, history);
        console.log(response); // Xem log để kiểm tra kết quả
        toast.success("Thành công");
      } catch (error) {
        toast.error("Thất bại toàn tập");
        console.error(error);
      }
    } else {
      toast.error("Thất bại");
    }
  };
  return (
    <div className="change-container">
      <form>
        <div className="container">
          <div className="row justify-content-center">
            <div className="content-left col-12 col-md-3 col-lg-4 d-none d-sm-block"></div>
            <div className="content-center col-12 col-sm-8 col-md-6 col-lg-4  col-xl-3  text-center ">
              <img src={testlogo} className="logo" alt="logo" />
              <div className="content d-flex flex-column gap-3 py-3">
                <div className="brand">
                  <h1>TotMusica</h1>
                </div>
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
                <button
                  type="submit"
                  className="btn btn-Confirm"
                  onClick={changePassword}
                >
                  <span>Confirm</span>
                </button>
                <span
                  className="text-center"
                  onClick={() => history.push("./loginpage")}
                >
                  <a className="forgot-password">Return to login</a>
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

export default ChangePassword;
