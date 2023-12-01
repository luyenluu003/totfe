// import React from "react";
import React, { useEffect, useRef, useState } from "react";
import "./RightMenu.scss";
import { CiCircleMore } from "react-icons/ci";
import { PiSpeakerHighBold } from "react-icons/pi";
import { BiSolidUser } from "react-icons/bi";
import { FaUserPen } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { IoHome } from "react-icons/io5";
import { MdOutlineSettings } from "react-icons/md";
import Playlist from "../playlist/Playlist";
import Recently from "../recentlylist/Recently";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../rudex/apiRequest";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../rudex/authSlice";

const RightMenu = ({}) => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const accessToken = user?.accessToken;
  const id = user?._id;
  const history = useHistory();
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  /*Toggle */
  const togglePlaylist = () => {
    const p = document.getElementsByClassName("box1")[0];
    const s = document.getElementsByClassName("box2")[0];
    s.style.display = "none";
    if (p.style.display === "none" || p.style.display === "") {
      p.style.display = "block";
    } else {
      p.style.display = "block";
    }
  };
  const togglePlaylist2 = () => {
    const p = document.getElementsByClassName("box1")[0];
    const s = document.getElementsByClassName("box2")[0];
    p.style.display = "none";
    if (s.style.display === "none" || s.style.display === "") {
      s.style.display = "block";
    } else {
      s.style.display = "block";
    }
  };
  /* */
  /*More */
  const toggleMenu = () => {
    const menu = document.getElementsByClassName("menu")[0];
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  };

  //logout
  const handleLogout = () => {
    logOut(dispatch, id, history, accessToken, axiosJWT);
    console.log("loggout success");
    console.log("ID:", id);
    console.log("accessToken:", accessToken);
    console.log("AxiosJWT:", axiosJWT);
  };
  /* */
  return (
    <div className="RightMenu">
      <div className="HomeRight d-flex flex-clumn justify-content-around">
        <div className="homeBox d-flex">
          <div className="double-b">
            <button
              className="buttom-playlist border-left"
              onClick={togglePlaylist}
            >
              <h6>Playlist</h6>
            </button>
            <button
              className="buttom-playlist border-right"
              onClick={togglePlaylist2}
            >
              <h6>Listen recently</h6>
            </button>
          </div>
          <div className="more">
            <i className="more-icon" onClick={toggleMenu}>
              <CiCircleMore />
            </i>
            <div className="menu">
              <div className="menu-body">
                <ul>
                  <li>
                    <a onClick={() => history.push("/profile")}>
                      Profile
                      <i className="bi">
                        <BiSolidUser />
                      </i>
                    </a>
                  </li>
                  <li>
                    <a onClick={() => history.push("/EditProfile")}>
                      Edit profile
                      <i className="fa">
                        <FaUserPen />
                      </i>
                    </a>
                  </li>
                  <li>
                    <a onClick={() => history.push("/")}>
                      Home
                      <i className="io">
                        <IoHome />
                      </i>
                    </a>
                  </li>
                  <div class="bordered-div"></div>
                  <li onClick={handleLogout}>
                    <a>
                      Log out
                      <i className="tb">
                        <TbLogout />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="list">
        <div className="box1">
          <Playlist />
        </div>
        <div className="box2">
          <Recently />
        </div>
      </div>
      {/* <i>
            <PiSpeakerHighBold />
      </i> */}
    </div>
  );
};

export default RightMenu;
