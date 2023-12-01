import "./App.scss";
import LoginPage from "./auth/LoginPage/LoginPage.js";
import SignupPage from "./auth/SignupPage/SignupPage.js";
import HomePage from "./pages/HomePage/HomePage.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ListMusic } from "./pages/ListMusic/ListMusic.js";
import { ListMusicSinger } from "./pages/listMusicSinger/ListMusicSinger.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SingerHomePage } from "./pages/SingerHomePage/SingerHomePage.js";
import { PlaylistHomePage } from "./pages/PlaylistHomePage/PlaylistHomePage.js";
import EditProfile from "./pages/EditProfile/EditProfile.js";
import Profile from "./pages/Profile/ProFile.js";
import TopTrending from "./pages/TopTrending/TopTrending.jsx";
import ForgotPassword from "./auth/ForgotPassword/ForgotPassword.js";
import ChangePassword from "./auth/ChangePassword/ChangePassword.js";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/LoginPage">
            <LoginPage />
          </Route>
          <Route path="/SignupPage">
            <SignupPage />
          </Route>
          <Route path="/forgotpassword">
            <ForgotPassword />
          </Route>
          <Route path="/changepassword">
            <ChangePassword />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/listmusic">
            <ListMusic />
          </Route>
          <Route path="/playlist/:id">
            <SingerHomePage />
          </Route>
          <Route path="/singerhomepage/:id">
            <SingerHomePage />
          </Route>
          <Route path="/listmusicsinger/:id">
            <ListMusicSinger />
          </Route>
          <Route path="/PlaylistHomePage/:id">
            <PlaylistHomePage />
          </Route>
          <Route path="/ProFile">
            <Profile />
          </Route>
          <Route path="/toptrending">
            <TopTrending />
          </Route>
          <Route path="/EditProfile">
            <EditProfile />
          </Route>
          <Route path="*">404 nout found</Route>
        </Switch>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Router>
  );
}

export default App;
