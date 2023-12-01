import React, { useEffect, useRef } from "react";
import "./SongImage.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const SongImage = ({ favorite, imgSrc, songName, artist }) => {
  const [islove, setIsLove] = useState(false);

  const boxRef = useRef();

  //Hàm cho chữ chạy
  useEffect(() => {
    const box = boxRef.current;
    const marquee = document.createElement("div");
    marquee.innerText = `${songName}`;
    marquee.className = "marquee";

    box.innerHTML = "";
    box.appendChild(marquee);
  }, [songName]);
  const changeLoved = () => {
    setIsLove(!islove);
  };

  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/totmusica-95359.appspot.com/o/images%2Fsnapedit_1700579229732.pnga237daf2-3f4c-4728-be0e-55a7770d5019?alt=media&token=13f34859-483d-4cfc-8c0d-36c088911837";
  const imageUrl = imgSrc ? imgSrc : defaultImage;
  return (
    <div className="songImage d-flex">
      <div className="boxImage">
        <img src={imageUrl} alt="{songName}" />
      </div>
      <div className="boxName">
        <span ref={boxRef}>{songName}</span>
        <span>{artist}</span>
      </div>
      <div className="loved" onClick={changeLoved}>
        {islove ? (
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
  );
};

export default SongImage;
