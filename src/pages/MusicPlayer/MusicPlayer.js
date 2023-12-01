import React, { useEffect, useRef, useState } from "react";
import "./MusicPlayer.scss";
import { LiaRandomSolid } from "react-icons/lia";
import { CiRepeat } from "react-icons/ci";
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs";
import {
  FaStepBackward,
  FaBackward,
  FaPause,
  FaPlay,
  FaForward,
  FaStepForward,
} from "react-icons/fa";
import { PiSpeakerHighBold } from "react-icons/pi";
import { PiSpeakerNoneBold } from "react-icons/pi";
import { useAppContext } from "../../context/AppContext";
const MusicPlayer = ({ song, songs }) => {
  const [isLove, setLoved] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isUserInteracted, setIsUserInteracted] = useState(false); // Cờ tương tác của người dùng
  const [volume, setVolume] = useState(); // mặc định âm lượng 50%
  const volumeSlider = useRef();
  const [prevVolume, setPrevVolume] = useState(50);
  const [isRepeatClicked, setIsRepeatClicked] = useState(false); // click vào repeat
  const [israndomClicked, setIsRandomClicked] = useState(false); // click vào random

  const audioPlayer = useRef(); // âm thanh
  const progressBar = useRef(); // thanh thời gian nhạc
  const animationRef = useRef();

  const {
    setImgSource,
    setFavouriteSource,
    setSongNameSource,
    setArtistSource,
  } = useAppContext();

  useEffect(() => {
    const currentSong = songs[currentSongIndex];

    // Cập nhật giá trị ngữ cảnh khi bài hát thay đổi
    setImgSource(currentSong.imgSrc);
    setFavouriteSource(currentSong.favourite);
    setSongNameSource(currentSong.songName);
    setArtistSource(currentSong.artist);

    // Lưu ý: Bạn có thể thêm các tác vụ cập nhật context khác tại đây nếu cần thiết
  }, [songs, currentSongIndex]);

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  //next song
  const playNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex((prevIndex) => prevIndex + 1);
    } else {
      // Nếu là bài hát cuối cùng, quay lại bài hát đầu tiên
      setCurrentSongIndex(0);
    }
    setIsUserInteracted(true); // Đánh dấu rằng người dùng đã tương tác
  };
  const playprevSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1);
    }
    setIsUserInteracted(true); // Đánh dấu rằng người dùng đã tương tác
  };

  useEffect(() => {
    audioPlayer.current.src = songs[currentSongIndex].song;

    audioPlayer.current.load();
    // Kiểm tra nếu người dùng đã tương tác, thì mới tự động play nhạc
    if (isUserInteracted && !isRepeatClicked) {
      audioPlayer.current.play();
    }

    // Đặt chế độ lặp lại
    audioPlayer.current.loop = isRepeatClicked;
  }, [songs, currentSongIndex, isUserInteracted, isRepeatClicked]);

  //tự động next bài
  const handleSongEnded = () => {
    setCurrentTime(0); // Đặt thời gian hiện tại về 0 khi bài hát kết thúc
    if (currentSongIndex < songs.length - 1) {
      // Nếu chưa phải là bài hát cuối cùng, chuyển sang bài hát tiếp theo
      setCurrentSongIndex((prevIndex) => prevIndex + 1);
    } else {
      // Nếu là bài hát cuối cùng, quay lại bài hát đầu tiên
      setCurrentSongIndex(0);
    }

    setIsUserInteracted(true); // Đánh dấu rằng người dùng đã tương tác

    // Đặt chế độ lặp lại
    audioPlayer.current.loop = isRepeatClicked;
    audioPlayer.current.play();
  };

  useEffect(() => {
    // Đăng ký xử lý sự kiện "ended" khi bài hát kết thúc
    audioPlayer.current.addEventListener("ended", handleSongEnded);

    return () => {
      // Hủy đăng ký xử lý sự kiện khi component unmount
      if (audioPlayer.current) {
        audioPlayer.current.removeEventListener("ended", handleSongEnded);
      }
    };
  }, [songs, currentSongIndex, isUserInteracted]);

  const changePlayPause = () => {
    const prevValue = isPlaying;
    setPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const CalculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    //10 or -> 09 or 11,12
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnMin}:${returnSec}`;
  };

  const whilePlaying = () => {
    if (audioPlayer.current) {
      progressBar.current.value = audioPlayer.current.currentTime;
      changeCurrenTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeProgress = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changeCurrenTime();
  };

  const changeCurrenTime = () => {
    progressBar.current.style.setProperty(
      "--player-played",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const onLoadedMetadata = () => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  };

  const onTimeUpdate = () => {
    setCurrentTime(audioPlayer.current.currentTime);
    progressBar.current.style.setProperty(
      "--player-played",
      `${(audioPlayer.current.currentTime / duration) * 100}%`
    );
  };
  const changeLoved = () => {
    setLoved(!isLove);
  };

  // Tăng giảm volume
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioPlayer.current.volume = newVolume / 100;
  };

  const handleToggleVolume = () => {
    if (volume > 0) {
      // Nếu âm thanh đang lớn hơn 0, thực hiện hành động để đặt giá trị âm lượng về 0
      setPrevVolume(volume);
      setVolume(0);
      audioPlayer.current.volume = 0;
    } else {
      // Nếu âm thanh là 0, thực hiện hành động để khôi phục giá trị âm lượng từ trạng thái trước đó
      setVolume(prevVolume);
      audioPlayer.current.volume = prevVolume / 100;
    }
  };

  const handleRepeatClick = () => {
    setIsRepeatClicked(!isRepeatClicked);

    // Nếu isRepeatClicked là true, bật chế độ lặp lại, ngược lại tắt
    audioPlayer.current.loop = isRepeatClicked;
  };

  const getRandom = () => {
    return Math.floor(Math.random() * songs.length);
  };

  const handlerandomclick = () => {
    const random = getRandom();
    setIsRandomClicked(!israndomClicked);
    setCurrentSongIndex(random);
    setIsUserInteracted(true);
  };

  return (
    <div className="MusicPlayer">
      <div className="songAttributes">
        <audio
          src={song}
          preload="metadata"
          ref={audioPlayer}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
        />
        <div className="top d-flex">
          <div className="left">
            <div
              className={`randomMusic ${israndomClicked ? "clicked" : ""}`}
              onClick={handlerandomclick}
            >
              <i>
                <LiaRandomSolid />
              </i>
            </div>
          </div>
          <div className="middle d-flex">
            <div className="back">
              <i>
                <FaStepBackward />
              </i>
              <i>
                <FaBackward onClick={playprevSong} />
              </i>
            </div>
            <div className="playPause" onClick={changePlayPause}>
              {isPlaying ? (
                <i>
                  <BsFillPauseCircleFill />
                </i>
              ) : (
                <i>
                  <BsFillPlayCircleFill />
                </i>
              )}
            </div>
            <div className="forward">
              <i>
                <FaForward onClick={playNextSong} />
              </i>
              <i>
                <FaStepForward />
              </i>
            </div>
          </div>
          <div className="right">
            <div
              className={`repeat ${isRepeatClicked ? "clicked" : ""}`}
              onClick={handleRepeatClick}
            >
              <i>
                <CiRepeat />
              </i>
            </div>
            <div className="volumeControl">
              <i className="high-bold" onClick={handleToggleVolume}>
                <PiSpeakerHighBold />
              </i>
              <i className="none-bold">
                <PiSpeakerNoneBold />
              </i>
              <input
                type="range"
                className="volumeSlider"
                ref={volumeSlider}
                value={volume}
                audioPlayer={audioPlayer}
                onChange={handleVolumeChange}
                min={0}
                max={100}
              />
            </div>
          </div>
        </div>
        <div className="bottom d-flex">
          <div className="currentTime">{CalculateTime(currentTime)}</div>
          <input
            type="range"
            className="progresBar"
            ref={progressBar}
            onChange={changeProgress}
          />
          <div className="duration">
            {duration && !isNaN(duration) && CalculateTime(duration)
              ? CalculateTime(duration)
              : "00:00"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
