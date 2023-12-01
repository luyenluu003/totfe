import React, { useEffect } from "react";
import "./SingerHomePage.scss";
import RightMenu from "../rightMenu/RightMenu";
import LeftHome from "../LeftHome/LeftHome";
import { SingerPlaylist } from "../SingerPlaylist/SingerPlaylist";
import { ShareHome } from "../shareHome/ShareHome";
import { MdVerified } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AOT, Riot, SonTung, Yaosobi,EU,LisNhacCuaDuong,Denvau,Lowg,Phuongly,More } from "../../Songs/index";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const SingerHomePage = () => {
  const { id } = useParams();
  let selectedMusic = [];
  let Singer = [];
  
  if (id !== null) {
    console.log("ID:", id);
    const musicMap = {
      "1": { name: "SonTung", singer: SingerPlaylist[0], music: SonTung },
      "2": { name: "Riot", singer: SingerPlaylist[1], music: Riot },
      "3": { name: "Yaosobi", singer: SingerPlaylist[2], music: Yaosobi },
      "4": { name: "EU", singer: SingerPlaylist[3], music: EU },
      "5": { name: "LisNhacCuaDuong", singer: SingerPlaylist[4], music: LisNhacCuaDuong },
      "6": {name : "DenVau", singer: SingerPlaylist[5], music: Denvau},
      "7": { name: "AOT", singer: SingerPlaylist[6], music: AOT },
      "8": { name: "PhuongLy", singer: SingerPlaylist[7], music:Phuongly},
      "9": { name: "Lowg", singer: SingerPlaylist[8], music: Lowg},
      "10": { name: "More", singer: SingerPlaylist[9], music: More},
    };
    if (id in musicMap) {
      console.log(musicMap[id].music);
      selectedMusic = musicMap[id].music;
      Singer = musicMap[id].singer;
    } else {
      console.log("Không có ID");
    }
  }
  const [songs, setSongs] = useState(selectedMusic);
  const [song, setSong] = useState(selectedMusic[0].song);

  const { setImgSource } = useAppContext();
  const { setFavouriteSource } = useAppContext(false);
  const { setSongNameSource } = useAppContext();
  const { setArtistSource } = useAppContext();

  const history = useHistory();

  useEffect(() => {
    const songs = document.querySelectorAll(".selectedMusic");
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

  const randommusic = getRandom(selectedMusic, 5);
  return (
    <div className="SingerHomePage">
      <LeftHome />
      <div className="MainSingerHomePage">
        <div className="HomeMainSingerHomePage ">
          <ShareHome />
          <div className="titleSinger d-flex">
            <div className="singerImg">
              <img src={Singer.imgSrc} alt={Singer.name} />
            </div>
            <div className="singerContent">
              <div className="singerName">
                <h3>{Singer.name}</h3>
                <i>
                  <MdVerified />
                </i>
              </div>
              <div className="follow">
                <span>{Singer.follow} Follow</span>
                <button className="btnFollow">
                  <span>Follow</span>
                </button>
              </div>
            </div>
          </div>
          <div className="internalSong">
            <div className="BoxLine d-flex">
              <h3>Internal Song</h3>
              <div className="line"></div>
              <a onClick={() => history.push(`/listmusicsinger/${id}`)}>
                Show all
                <i>
                  <MdKeyboardArrowRight />
                </i>
              </a>
            </div>
            <div className="BoxMusic">
              {randommusic.map((song, index) => (
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
        </div>
        <MusicPlayer song={song} songs={songs} />
      </div>
      <RightMenu />
    </div>
  );
};

export { SingerHomePage };
