import React from "react";
import "./ListMusicSinger.scss";
import RightMenu from "../rightMenu/RightMenu";
import LeftHome from "../LeftHome/LeftHome";
import { ShareHome } from "../shareHome/ShareHome";
import { SonTung, AOT,Riot, Yaosobi,EU,LisNhacCuaDuong, Denvau, Lowg,Phuongly,More } from "../../Songs/index";
import { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { FaHeadphones, FaHeart, FaRegHeart } from "react-icons/fa";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ListMusicSinger = () => {
  const { id } = useParams();
  let selectedMusic = [];
  let Singer = [];
  if (id !== null) {
    console.log("ID:", id);
    const musicMap = {
      "1": SonTung,
      "2": Riot,
      "3": Yaosobi,
      "4": EU,
      "5": LisNhacCuaDuong,
      "6": Denvau,
      "7": AOT,
      "8": Phuongly,
      "9": Lowg,
      "10":More,
    };
    if (id in musicMap) {
      console.log(musicMap[id]);
      selectedMusic = musicMap[id];
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

  const changeFavourtie = (id) => {
    selectedMusic.forEach((song) => {
      if (song.id === id) {
        song.favourite = !song.favourite;
      }
    });
    setSongs([...selectedMusic]);
  };
  return (
    <div className="ListMusicSinger">
      <LeftHome />
      <div className="MainListMusicSinger">
        <div className="HomeMainListMusicSinger">
          <ShareHome />
          <div className="audioList">
            <h2 className="title">
              The List <span>{`${selectedMusic.length} songs`}</span>
            </h2>
            <div className="songConTainer">
              {selectedMusic &&
                selectedMusic.map((song, index) => (
                  <div
                    className="songs"
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
                    <div className="count">{`#${index + 1}.`}</div>
                    <div className="song">
                      <div className="imgBox">
                        <img src={song?.imgSrc} alt="Songs" />
                      </div>
                      <div className="section">
                        <p className="songName">
                          {song?.songName}
                          <span className="spanArtist">{song?.artist}</span>
                        </p>
                        <div className="hits">
                          <p className="hit">
                            <i>
                              <FaHeadphones />
                            </i>
                            {song?.view}
                          </p>

                          <div
                            className="favourite"
                            onClick={() => changeFavourtie(song?.id)}
                          >
                            {song?.favourite ? (
                              <i>
                                <FaHeart />
                              </i>
                            ) : (
                              <i>
                                <FaRegHeart />
                              </i>
                            )}
                          </div>
                        </div>
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

export { ListMusicSinger };
