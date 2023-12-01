import React from "react";
import "./TopTrending.scss";
import LeftHome from "../LeftHome/LeftHome";
import RightMenu from "../rightMenu/RightMenu";
import { ShareHome } from "../shareHome/ShareHome";
import { FaHeadphones } from "react-icons/fa";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { EU, SonTung } from "../../Songs/index";
import { useState } from "react";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

const TopTrending = () => {
  const [songs, setSongs] = useState(EU);
  const [song, setSong] = useState(EU[0].song);
  const { setImgSource } = useAppContext();
  const { setFavouriteSource } = useAppContext(false);
  const { setSongNameSource } = useAppContext();
  const { setArtistSource } = useAppContext();

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

  const sortedSongs = [...songs].sort((a, b) => b.view - a.view);

  return (
    <div className="TopTrending">
      <LeftHome />
      <div className="MainTopTrending">
        <div className="HomeMainTopTrending">
          <ShareHome />
          <div className="playScroll">
            {sortedSongs.map((song, index) => (
                <div className="titleTopTrending d-flex">
                  <div className="titleLeft">
                    <div className="top">
                      <h2>{song?.songName}</h2>
                      <h4>Top {index + 1} Trending</h4>
                    </div>
                    <div className="bottom">
                      <div className="bottomLeft">
                        <h4>{song?.artist}</h4>
                        <div className="view">
                          <i>
                            <FaHeadphones />
                          </i>
                          <span>{song?.view}</span>
                        </div>
                      </div>
                      <div className="bottomRight">
                        <button className="btnFollow">
                          <span>Follow</span>
                        </button>
                        <div className="playMusic">
                          <i
                            key={song?.id}
                            onClick={() => {
                              setMainSong(
                                song?.song,
                                song?.imgSrc,
                                song?.favourite,
                                song?.songName,
                                song?.artist
                              );
                            }}
                          >
                            <BsFillPlayCircleFill />
                          </i>
                          <span>Play Music</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="titleRight">
                    <div className="singerImage">
                      <img src={song?.imgSrc} alt="" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <MusicPlayer song={song} songs={songs} />
      </div>
      <RightMenu />
    </div>
  );
};

export default TopTrending;
