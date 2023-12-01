import "./Recently.scss";
import { Recentlylist } from "./RecentlyList";
const Recently = () => {
  return (
    <div className="recentlyContainer ">
      <div className="recentlyScroll ">
        {Recentlylist &&
          Recentlylist.map((list) => (
            <div className="recentlyList" key={list.id}>
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

export default Recently;
