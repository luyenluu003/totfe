import React, { useState } from "react";
import "./ForgotPassword.scss";
import testlogo from "../../Style/Image/testlogo.svg";
import { useHistory } from "react-router-dom";
import {
  ConfirmCode,
  ReceiveCode,
  checkEmailExistence,
} from "../../rudex/apiRequest";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useEffect } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  let history = useHistory();
  const defaultValidInput = {
    isValidEmail: true,
  };
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  const dispatch = useDispatch();
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
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
    return true;
  };

  //Email
  // const handlesendCode = (e) => {
  //   e.preventDefault();
  //   let check = isValidInputs();
  //   if (check === true) {
  //     ReceiveCode(email)
  //       .then((data) => {
  //         if (isMounted.current) {
  //           toast.success("Gửi code thành công");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // };
  const handlesendCode = async (e) => {
    e.preventDefault();
    let check = isValidInputs();
    if (check === true) {
      try {
        const isEmailExist = await checkEmailExistence(email);
        if (isEmailExist) {
          // Gửi mã xác nhận nếu email tồn tại
          ReceiveCode(email)
            .then((data) => {
              if (isMounted.current) {
                toast.success("Gửi code thành công");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          toast.error("Email không tồn tại");
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
        if (data == "Xác nhận thành công.");
        setIsEmailVerified(true);
        history.push("/changepassword");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Nhập mã code sai!!");
      });
  };
  return (
    <div className="forgot-container">
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
                <button
                  className="btn button-sendCode"
                  onClick={handlesendCode}
                >
                  Send Code
                </button>
                <input
                  type="text"
                  className="input-custom "
                  placeholder="Confirmation code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="submit"
                  className="btn btn-login-verification"
                  onClick={handleConfirmCode}
                >
                  <span>Verification</span>
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

export default ForgotPassword;
