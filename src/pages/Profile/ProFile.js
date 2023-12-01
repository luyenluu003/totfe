import React, { useEffect, useRef } from "react";
import "./Profile.scss"; // Hãy chắc chắn rằng tên tệp khớp với câu lệnh import của bạn
import LeftHome from "../LeftHome/LeftHome";
import { useState } from "react";
import { ProfileSong } from "../../Songs/Profilesong";
import { useAppContext } from "../../context/AppContext";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { IoSettingsOutline } from "react-icons/io5";
import { GrNext } from "react-icons/gr";
import { MdOutlineArrowBackIos } from "react-icons/md";
import SingerPlay from "../SingerPlaylist/SingerPlay";
import {
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { MdArrowForwardIos } from "react-icons/md";
 
const Profile = () => {
    const history = useHistory();
    const [songs, setSongs] = useState(ProfileSong);
    const [song, setSong] = useState(ProfileSong[0].song);
    const { setImgSource } = useAppContext();
    const { setFavouriteSource } = useAppContext(false);
    const { setSongNameSource } = useAppContext();
    const { setArtistSource } = useAppContext();
  
    const setMainSong = (songSrc, imgSrc, favourite, songName, artist) => {
      setSong(songSrc);
      setSongs(songs);
      setImgSource(imgSrc);
      setFavouriteSource(favourite);
      setSongNameSource(songName);
      setArtistSource(artist);
    };
  const { imgSrc, favorite, songName, artist } = useAppContext();
  const handleImageClick = (clickedSong) => {
    history.push(`/listmusicsinger/${clickedSong.id}`);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nextButton = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };
  
  const prevButton = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };
  
  return (
    <div className="Profile">
      <LeftHome />
      <div className="MainProfile">
        <div className="HomeMainProfile">
            <div className="Profile-tittle">
                <div className="avt-img">
                  <img src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-1/325666592_1623536444732729_3136251483457055167_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=B1g282bizRAAX8IfJz4&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCg3TxgdGcAmTeIVyxqYXsSeST4xRUo6o7Azyo4zDGgFg&oe=655D5C4E" />  
                </div>
                <div className="Profile-name">
                    <h3>Min_0306</h3>
                    <span>1 tỷ danh sách phát công khai</span>
                </div>
                <div className="edit">
                    <h3 onClick={() => history.push("/EditProfile")}>
                      Edit profile
                    </h3>
                    <i onClick={() => history.push("/EditProfile")}>< IoSettingsOutline/></i>
                    <div>Đang theo dõi 24 người người dùng</div>
                </div>
            </div>
            <div class="bordered-div"></div>
            <div className="profile-content">
              <div className="bar-function">
              </div>
              <div className="Playlist-box">
                  <h3>Playlist
                    <div className="prev-next-back">
                        <i className="next-button" onClick={nextButton}>
                          <MdOutlineArrowBackIos />
                        </i>
                        <i className="prev-button" onClick={prevButton}>
                        <MdArrowForwardIos />
                        </i>
                    </div>
                  </h3>
                  <div className="playlist-card" style={{ transform: `translateX(-${currentImageIndex * (200 + 20)}px)` }}>
                      {songs.map((song, index) => (
                        <div key={index} className={`card-content ${index === currentImageIndex ? 'active' : ''}`} onClick={() => handleImageClick(song)}>
                          <div className="img-box">
                            <img src={song.imgSrc} alt={song.songName} />
                          </div>
                        </div>
                    ))}
                  </div>
              </div>
            </div>
        </div>
        <div className="max-weight">
        <MusicPlayer song={song} songs={songs} />
        </div>
      </div>
    </div>
  );
};

export default Profile; 
