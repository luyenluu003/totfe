import React, { useEffect, useState } from "react";
import "./PlaylistHomePage.scss";
import RightMenu from "../rightMenu/RightMenu";
import LeftHome from "../LeftHome/LeftHome";
import { ShareHome } from "../shareHome/ShareHome";
import { PlaylistSong } from "../../Songs/PlaylistSong";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import { useParams } from "react-router-dom";

const PlaylistHomePage = () => {
  const { id } = useParams();
  let selectedMusic = [];
  let Singer = {};
  if (id !== null) {
    console.log("ID:", id);
    const selectedSinger = PlaylistSong.find(song => song.id === Number(id));
    if (selectedSinger) {
      console.log("PlaylistSong");
      Singer = selectedSinger;
      selectedMusic = [selectedSinger]; 
    } else {
      console.log("Không có ID tương ứng");
    }
  }

  const [songs, setSongs] = useState(selectedMusic);
  const [song, setSong] = useState(selectedMusic[0]?.song);
  const [rotation, setRotation] = useState(1);


  const changeMenuActive = (event, index) => {
    const updatedSongs = songs.map((prevSong, i) =>
      i === index
        ? {
            ...prevSong,
          }
        : prevSong
    );
  
    setSongs((prevSongs) => {
      return prevSongs.map((prevSong, i) =>
        i === index
          ? {
              ...prevSong,
            }
          : prevSong
      );
    });
  
    setSong(updatedSongs[index]?.song);
  };

  useEffect(() => {
    const songs = document.querySelectorAll(".selectedMusic");
    function changeMenuActive() {
      songs.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }
    songs.forEach((n) => n.addEventListener("click", changeMenuActive));
    return () => {
      songs.forEach((n) => n.removeEventListener("click", changeMenuActive));
    };
  }, []);

  useEffect(() => {
    const songs = document.querySelectorAll(".selectedMusic");
  
    function changeMenuActive(event) {
      songs.forEach((n) => n.classList.remove("active"));
      event.target.classList.add("active");
    }
  
    songs.forEach((n) => n.addEventListener("click", changeMenuActive));
  
    return () => {
      songs.forEach((n) => n.removeEventListener("click", changeMenuActive));
    };
  }, []);

  //Xoay
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 1);
    }, 40);

    return () => clearInterval(rotationInterval);
  }, []); 

  return (
    <div className="PlaylistHomePage">
      <LeftHome />
      <div className="MainPlaylistHomePage">
          <div className="HomeMainPlaylistHomePage">
          <ShareHome />
          <div className="lyricsMain">
              <div className="lyrictitlle">
                <h3 className="song-name">{Singer.songName}</h3>
                <br/>
                <h3 className="artist">{Singer.artist}</h3>
              </div>
              <div className="singerImg">
                <img id="rotatableImage" src={Singer.imgSrc} alt={Singer.songName} style={{ transform: `rotate(${rotation}deg)` }} />
              </div>
          </div>
          <div className="lyricsBox">
            <div className="lyricsLine">
              <div class="lyric"></div>
            </div>
          </div>
        </div>
        <MusicPlayer song={song} songs={songs} changeMenuActive={changeMenuActive} />
      </div>
      <RightMenu/>
    </div>
  );
};

export { PlaylistHomePage };
