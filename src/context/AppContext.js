import React, { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [favourite, setFavourite] = useState(false);
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");

  const setImgSource = (img) => {
    setImgSrc(img);
  };
  const setFavouriteSource = (favourite) => {
    setFavourite(favourite);
  };
  const setSongNameSource = (songName) => {
    setSongName(songName);
  };
  const setArtistSource = (artist) => {
    setArtist(artist);
  };

  return (
    <AppContext.Provider
      value={{
        imgSrc,
        favourite,
        songName,
        artist,
        setImgSource,
        setFavouriteSource,
        setSongNameSource,
        setArtistSource,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
