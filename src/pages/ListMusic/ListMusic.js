import React from "react";
import "./ListMusic.scss";
import RightMenu from "../rightMenu/RightMenu";
import LeftHome from "../LeftHome/LeftHome";
import { ShareHome } from "../shareHome/ShareHome";
import { AOT } from "../../Songs/AOT";
import { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { FaHeadphones, FaHeart, FaRegHeart } from "react-icons/fa";
import MusicPlayer from "../MusicPlayer/MusicPlayer";

const ListMusic = () => {
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

  const changeFavourtie = (id) => {
    AOT.forEach((song) => {
      if (song.id === id) {
        song.favourite = !song.favourite;
      }
    });
    setSongs([...AOT]);
  };
  return (
    <div className="ListMusic">
      <LeftHome />
      <div className="MainListMusic">
        <div className="HomeMainListMusic">
          <ShareHome />
          <div className="audioList">
            <h2 className="title">
              The List <span>{`${AOT.length} songs`}</span>
            </h2>
            <div className="songConTainer">
              {AOT &&
                AOT.map((song, index) => (
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
                    <div className="count">{`#${index + 1}`}</div>
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

export { ListMusic };
