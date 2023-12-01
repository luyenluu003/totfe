import React, { useEffect } from "react";
import "./MainContainer.scss";
import { ShareHome } from "../shareHome/ShareHome";
import { MdKeyboardArrowRight } from "react-icons/md";
import { EU,LisNhacCuaDuong } from "../../Songs/index";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MainContainer = () => {
  const [songs, setSongs] = useState(EU);
  const [song, setSong] = useState(EU[0].song);

  const { setImgSource } = useAppContext();
  const { setFavouriteSource } = useAppContext(false);
  const { setSongNameSource } = useAppContext();
  const { setArtistSource } = useAppContext();

  const history = useHistory();

  useEffect(() => {
    const songs = document.querySelectorAll(".EU");
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

  //Tạo hàm random hiển thị nhạc
  const getRandom = (arr, index) => {
    const shuffledArray = arr.sort(() => Math.random() - 0.5);
    return shuffledArray.slice(0, index);
  };

  const random = getRandom(EU, 5);
  return (
    <div className="MainContainer">
      <div className="HomeMaincontainer">
        <ShareHome />
        <div className="BoxLine d-flex">
          <h3>Set for you</h3>
          <div className="line"></div>
          <a>
            Show all
            <i>
              <MdKeyboardArrowRight />
            </i>
          </a>
        </div>
        <div className="BoxMusic">
          <div className="cardMusic" onClick={() => history.push("/singerhomepage/1")}>
            <div className="card-content">
              <div className="imageBox">
                <img src="https://yt3.googleusercontent.com/mm2-5anuZ6ghmK2zL6QM7wciD6kuupOfOagiAh5vZE1hx9tRhKEXTAExZUUY4PVq2RSw9jBpBQ=s900-c-k-c0x00ffffff-no-rj" />
              </div>
              <div className="card-bottom">
                <span>M-TP</span>
                <span>Sơn tùng</span>
              </div>
            </div>
          </div>
          <div className="cardMusic" onClick={() => history.push("/singerhomepage/4")}>
            <div className="card-content">
              <div className="imageBox">
                <img src="https://firebasestorage.googleapis.com/v0/b/totmusica-95359.appspot.com/o/images%2Fartworks-000219662523-o9o4r2-t500x500.jpg2f702f4b-9bc8-4399-a1d0-01db273f2203?alt=media&token=3d998772-94bf-4f6a-b062-bbbf4381a73f" />
              </div>
              <div className="card-bottom">
                <span>Charlie Puth</span>
                <span>Singer</span>
              </div>
            </div>
          </div>
        </div>
        <div className="BoxLine d-flex">
          <h3>Top of the week</h3>
          <div className="line"></div>
          <a onClick={() => history.push("/listmusicsinger/4")}>
            Show all
            <i>
              <MdKeyboardArrowRight />
            </i>
          </a>
        </div>
        <div className="BoxMusic">
          {random.map((song, index) => (
            <div
              className="cardMusic"
              key={song?.id}
              onClick={() =>
                setMainSong(
                  song?.song,
                  song?.imgSrc,
                  song?.favourite,
                  song?.songName,
                  song?.artist
                )
              }
            >
              <div className="card-content">
                <div className="imageBox">
                  <img src={song.imgSrc} />
                </div>
                <div className="card-bottom">
                  <span>{song.songName}</span>
                  <span>{song.artist}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MusicPlayer song={song} songs={songs} />
    </div>
  );
};

export default MainContainer;
