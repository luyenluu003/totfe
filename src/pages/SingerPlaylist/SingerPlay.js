import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./SingerPlay.scss";
import { SingerPlaylist } from "./SingerPlaylist";
const SingerPlay = ({ id }) => {
  const history = useHistory();
  return (
    <div className="playListContainer ">
      <div className="playListScroll ">
        {SingerPlaylist &&
          SingerPlaylist.map((list) => (
            <div
              className="playList"
              key={list.id}
              onClick={() => history.push(`/singerhomepage/${list.id}`)}
            >
              <div className="personImage">
                <img src={list.imgSrc} alt="" />
              </div>
              <div className="informationPerson d-flex">
                <span>{list.name}</span>
                <span>{list.job}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SingerPlay;
