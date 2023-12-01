import React from "react";
import "./ShareHome.scss";
import { BiSearchAlt } from "react-icons/bi";
import { useSelector } from "react-redux/es/hooks/useSelector";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const ShareHome = () => {
  const history = useHistory();

  //Lấy tên tài khoản người dùng
  const user = useSelector((state) => state.auth.login.currentUser);
  const goBack = () => {
    //trở lại trang trước đó
    history.goBack();
  };

  const goForward = () => {
    // trở lại trang tiếp đó
    history.goForward();
  };
  if (!user) {
    history.push("/LoginPage");
    return null; // Ngăn component tiếp tục render nếu đã chuyển hướng
  }
  return (
    <div className="topHome d-flex">
      <div className="directionalIcon">
        <i onClick={goBack}>
          <BsFillArrowLeftCircleFill />
        </i>
        <i onClick={goForward}>
          <BsFillArrowRightCircleFill />
        </i>
      </div>
      <div className="SearchBox">
        <input type="text" placeholder="Search..." />
        <i className="searchIcon">
          <BiSearchAlt />
        </i>
      </div>
      {user ? (
        <div className="nameHome d-flex">
          <span>{user.username}</span>
          <div className="imgBox">
            <img src="https://firebasestorage.googleapis.com/v0/b/totmusica-95359.appspot.com/o/images%2F377235226_1702539366916899_4315959216196634099_n.png151a5c5e-1d55-4dbf-92d2-8e48a5ab167c?alt=media&token=16dda5fe-2ee4-403a-b0f6-576802c96067&fbclid=IwAR25pYAJnEM7F5uRgm4p7f-RKZRMg8g6zTEpNqQgkMekkEbe4xDpQxNCQ0M" />
          </div>
        </div>
      ) : (
        <div className="nameHome d-flex">
          <span></span>
          <div className="imgBox">
            <img src="https://firebasestorage.googleapis.com/v0/b/totmusica-95359.appspot.com/o/images%2F377235226_1702539366916899_4315959216196634099_n.png151a5c5e-1d55-4dbf-92d2-8e48a5ab167c?alt=media&token=16dda5fe-2ee4-403a-b0f6-576802c96067&fbclid=IwAR25pYAJnEM7F5uRgm4p7f-RKZRMg8g6zTEpNqQgkMekkEbe4xDpQxNCQ0M" />
          </div>
        </div>
      )}
    </div>
  );
};
export { ShareHome };
