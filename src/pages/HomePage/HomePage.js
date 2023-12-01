import "./HomePage.scss";
import MainContainer from "../mainContainer/MainContainer";
import RightMenu from "../rightMenu/RightMenu";
import LeftHome from "../LeftHome/LeftHome";
const HomePage = () => {
  return (
    <div className="HomePage">
      <LeftHome />
      <MainContainer />
      <RightMenu />
    </div>
  );
};

export default HomePage;
