import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerFailed,
  registerSuccess,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailed,
  logOutStart,
  logOutFailed,
  logOutSuccess,
} from "./authSlice";
import { toast } from "react-toastify";

//login
export const loginUser = async (user, dispatch, history) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    history.push("/");
    toast.success("Đăng nhập thành công!");
  } catch (err) {
    toast.error("Đăng nhập thất bại!");
    dispatch(loginFailed());
  }
};
//register
export const registerUser = async (user, dispatch, history) => {
  console.log("dispatch", dispatch);
  console.log("user", user);
  dispatch(registerStart());
  try {
    const response = await axios.post(
      "http://localhost:8000/v1/auth/register",
      user
    );
    console.log("reponse", response); //
    dispatch(registerSuccess());
    history.push("/LoginPage");
  } catch (err) {
    console.log("err", err);
    dispatch(registerFailed());
  }
};

export const ReceiveCode = async (email) => {
  try {
    toast.success("Email xác nhận đã được gửi!");

    const response = await axios.post(
      "http://localhost:8000/email/send-verification-code",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Lỗi khi gửi Email xác nhận !");
    throw error;
  }
};

export const ConfirmCode = async (email, verificationCode) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/email/verify-code",
      {
        email,
        code: verificationCode,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//Check email
export const checkEmailExistence = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/email/check-email",
      {
        email,
      }
    );

    if (response.status === 200) {
      return response.data.isEmailExist;
    } else {
      // Xử lý trạng thái không mong muốn
      console.error("Unexpected server response:", response);
      throw new Error("Unexpected server response");
    }
  } catch (error) {
    // Xử lý lỗi từ axios
    console.error("Error checking email:", error);
    throw error;
  }
};

//change password
// export const changePasswordService = async (newPassword, history) => {
//   try {
//     const reponse = await axios.post(
//       "http://localhost:8000/v1/auth/changepassword",
//       { newPassword }
//     );
//     history.push("/LoginPage");
//     return reponse.data;
//   } catch (error) {
//     throw error;
//   }
// };
export const changePasswordService = async (newPassword, history) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/v1/auth/changepassword",
      {
        newPassword,
      }
    );
    if (response.status === 200) {
      history.push("/LoginPage");
      return response.data;
    } else {
      throw new Error("Lỗi không xác định từ API");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//cập nhập tên người dùng
export const updateProfile = (userData, history) => async (dispatch) => {
  dispatch(updateProfileStart());
  console.log("id:", userData.id);
  try {
    const response = await axios.put(
      `http://localhost:8000/v1//user/${userData.id}`,
      userData
    );
    dispatch(updateProfileSuccess(response.data));
    history.push("/"); // Chuyển hướng sau khi cập nhật thành công
  } catch (error) {
    console.error("Error updating profile:", error);
    dispatch(updateProfileFailed());
  }
};
// export const updateProfile =
//   (userData, history, accessToken, axiosJWT) => async (dispatch) => {
//     dispatch(updateProfileStart());
//     console.log("id:", userData.id);
//     try {
//       const response = await axiosJWT.put(
//         `http://localhost:8000/v1/user/${userData.id}`,
//         userData,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       dispatch(updateProfileSuccess(response.data));
//       history.push("/"); // Chuyển hướng sau khi cập nhật thành công
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       dispatch(updateProfileFailed());
//     }
//   };

// Logout
export const logOut = async (dispatch, id, history, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("http://localhost:8000/v1/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess()); // Dispatch action thành công khi logout
    history.push("/LoginPage");
  } catch (err) {
    console.error("Error:", err);
    dispatch(logOutFailed());
  }
};
