import "./Playlist.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { PlaylistSong } from "../../Songs/PlaylistSong";
const Playlist = ({ id}) => {
  const history = useHistory();
  return (
    <div className="playContainer ">
      <div className="playScroll ">
        {PlaylistSong &&
          PlaylistSong.map((list) => (
            <div
            className="playList"
            key={list.id}
            onClick={() => {
              history.push(`/PlaylistHomePage/${list.id}`);
            }}
          >
            <div className="personImage">
                <img src={list.imgSrc} alt="" />
              </div>
              <div className="informationPerson d-flex">
                <span>{list.songName}</span>
                <span>{list.artist}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Playlist;
