import React from "react";
import "./LeftHome.scss";
import {
  AiOutlineArrowRight,
  AiOutlineSearch,
  AiTwotoneHome,
} from "react-icons/ai";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { LuListMusic } from "react-icons/lu";
import { IoIosAdd } from "react-icons/io";
import { BiSearchAlt } from "react-icons/bi";
import SingerPlay from "../SingerPlaylist/SingerPlay";
import SongImage from "../../SongImage/SongImage";
import { useAppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LeftHome = () => {
  const { imgSrc, favorite, songName, artist } = useAppContext();
  const history = useHistory();
  return (
    <div className="LeftHome ">
      <div className="HomeLeft d-flex flex-column justify-content-around">
        <div className="homeBox d-flex" onClick={() => history.push("/")}>
          <i>
            <AiTwotoneHome />
          </i>
          <h4>Home Page</h4>
        </div>
        <div className="homeBox d-flex">
          <i>
            <AiOutlineSearch />
          </i>
          <h4>Search</h4>
        </div>
        <div
          className="homeBox d-flex"
          onClick={() => history.push("/toptrending")}
        >
          <i>
            <HiOutlineTrendingUp />
          </i>
          <h4>Top Trending</h4>
        </div>
      </div>
      <div className="leftContainer">
        <div className="logoContainer d-flex">
          <i>
            <LuListMusic />
          </i>
          <h4>Music</h4>
          <i>
            <IoIosAdd />
          </i>
          <i>
            <AiOutlineArrowRight />
          </i>
        </div>
        <div className="SearchBox">
          <input type="text" placeholder="Search..." />
          <i className="searchIcon">
            <BiSearchAlt />
          </i>
        </div>
        <SingerPlay />
      </div>
      <SongImage
        favorite={favorite}
        imgSrc={imgSrc}
        songName={songName}
        artist={artist}
      />
    </div>
  );
};

export default LeftHome;
