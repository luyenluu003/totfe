import React, { useEffect } from "react";
import "./EditProfile.scss";
import LeftHome from "../LeftHome/LeftHome";
import { useState } from "react";
import { AOT } from "../../Songs/index";
import { useAppContext } from "../../context/AppContext";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../rudex/apiRequest";
import { updateProfileSuccess } from "../../rudex/authSlice";
import { createAxios } from "../../createInstance";

const EditProfile = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [userName, setUserName] = useState();
  // const [email, setEmail] = useState();
  const userId = user ? user._id : null; // Lấy id của người dùng
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, updateProfileSuccess);

  const history = useHistory();

  const [songs, setSongs] = useState(AOT);
  const [song, setSong] = useState(AOT[0].song);
  const { setImgSource } = useAppContext();
  const { setFavouriteSource } = useAppContext(false);
  const { setSongNameSource } = useAppContext();
  const { setArtistSource } = useAppContext();

  useEffect(() => {
    const songs = document.querySelectorAll(".AOT");
    function changeMenuActive() {
      songs.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }
    songs.forEach((n) => n.addEventListener("click", changeMenuActive));
  }, []);
  const setMainSong = (songSrc, imgSrc, favourite, songName, artist) => {
    setSong(songSrc);
    setSongs(songs);
    setImgSource(imgSrc);
    setFavouriteSource(favourite);
    setSongNameSource(songName);
    setArtistSource(artist);
  };

  const handleCancel = () => {
    setUserName("");
  };

  //cập nhập người dùng
  const handleSave = () => {
    const userData = {
      id: userId, // Thêm id vào đối tượng userData
      username: userName,
    };
    console.log("userdata:", userData);
    // dispatch(updateProfile(userData, history, accessToken, axiosJWT));
    dispatch(updateProfile(userData, history));
    // console.log("accestoken:", accessToken);
  };

  return (
    <div className="EditProfile">
      <LeftHome />
      <div className="MainEditProfile">
        {user ? (
          <div className="HomeMainEditProfile">
            <div className="titleEditProfile">
              <div className="IamgeProfile">
                <img src="https://firebasestorage.googleapis.com/v0/b/totmusica-95359.appspot.com/o/images%2F393888992_357775026925012_2484755296145613706_n.png1616517c-286c-4577-b042-407eeb86f59c?alt=media&token=90934ecf-f40a-466e-861b-a41fb67c3d93&fbclid=IwAR25pYAJnEM7F5uRgm4p7f-RKZRMg8g6zTEpNqQgkMekkEbe4xDpQxNCQ0M" />
              </div>
              <div className="nameProfile">
                <h2>{user.username}</h2>
                <button className="btnEditIamge">
                  <span>Edit Image</span>
                </button>
              </div>
            </div>
            <div className="contentProfile">
              <div className="inputProfile">
                <h4>User name</h4>
                <input
                  type="text"
                  className="input-custom "
                  placeholder={user.username}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="inputProfile">
                <h4>Email</h4>
                <input
                  type="text"
                  className="input-custom "
                  placeholder={user.email}
                  readOnly
                />
              </div>
              <div className="bottomContentProfile">
                <span
                  className="text-center"
                  onClick={() => history.push("forgotpassword")}
                >
                  <a className="forgot-password" href="#">
                    Change Password ?
                  </a>
                </span>
              </div>
              <div className="buttonProfile">
                <button className="btn btnCancel" onClick={handleCancel}>
                  <span>Cancel</span>
                </button>
                <button className="btn btnSave" onClick={handleSave}>
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="HomeMainEditProfile">
            <div className="titleEditProfile">
              <div className="IamgeProfile">
                <img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/325666592_1623536444732729_3136251483457055167_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=B1g282bizRAAX8IfJz4&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCg3TxgdGcAmTeIVyxqYXsSeST4xRUo6o7Azyo4zDGgFg&oe=655D5C4E" />
              </div>
              <div className="nameProfile">
                <h2>Không có tài khoản</h2>
                <button className="btnEditIamge">
                  <span>Edit Image</span>
                </button>
              </div>
            </div>
            <div className="contentProfile">
              <div className="inputProfile">
                <h4>User name</h4>
                <input
                  type="text"
                  className="input-custom "
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="inputProfile">
                <h4>Email</h4>
                <input
                  type="text"
                  className="input-custom "
                  placeholder="Email"
                />
              </div>
              <div className="bottomContentProfile">
                <span
                  className="text-center"
                  onClick={() => history.push("forgotpassword")}
                >
                  <a className="forgot-password" href="#">
                    Change Password ?
                  </a>
                </span>
              </div>
              <div className="buttonProfile">
                <button className="btn btnCancel" onClick={handleCancel}>
                  <span>Cancel</span>
                </button>
                <button className="btn btnSave" onClick={handleSave}>
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="max-weight">
          <MusicPlayer song={song} songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
