import { BrowserRouter, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import EditMyBlogAboutme from "./pages/EditMyBlogAboutme";
import { __RouterContext } from "react-router";
import ExplorePage from "./pages/ExplorePage";
import PostStatus from "./components/PostStatus";
import ProjectsPage from "./pages/ProjectsPage";
import CoursePage from "./pages/CoursePage";
import Demo from './pages/Demo';
import VideoPage from "./pages/VideoPage";
import CourseDetail from "./pages/CourseDetail";
import QuestionPage from "./pages/QuestionPage";

import CGVLoginPage from "./pages/RapPhimPages/CGVLoginPage"
import CGVLichChieu from "./pages/RapPhimPages/CGVLichChieu";
import CGVPickSeat from "./pages/RapPhimPages/CGVPickSeat";
import CGVCheckout from "./pages/RapPhimPages/CGVCheckout";
import CGVPrintTicket from "./pages/RapPhimPages/CGVPrintTicket";

import CGVAdminQuanLyPhim from "./pages/RapPhimPages/CGVAdmin/CGVAdminQuanLyPhim";
import CGVAdminQuanLySuatChieu from "./pages/RapPhimPages/CGVAdmin/CGVAdminQuanLySuatChieu";
import CGVAdminQuanLyDoanhThu from "./pages/RapPhimPages/CGVAdmin/CGVAdminQuanLyDoanhThu";

import { createContext } from 'react';

//VideoPlaybackQuality

export const AppContext = createContext();

function App() {
  
  return (
    <AppContext.Provider>
      <BrowserRouter>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/sign-in" component={SignInPage}/>
        <Route exact path="/sign-up" component={SignUpPage}/>
        <Route exact path="/course" component={CoursePage}/>
        <Route exact path="/explore" component={ExplorePage}/>
        <Route exact path="/projects" component={ProjectsPage}/>
        <Route exact path="/question" component={QuestionPage}/>

        <Route exact path="/profile/:profileid" component={ProfilePage}/>
        <Route exact path="/edit-my-aboutme/:userid" component={EditMyBlogAboutme}/>
        <Route exact path="/poststatus" component={PostStatus}/>
        <Route exact path="/course-detail/:userid/:courseid" component={CourseDetail}/>
        <Route exact path="/video-view/:courseid/:videoid" component={VideoPage}/>
        <Route exact path="/demo" component={Demo}/>

        <Route exact path="/cgv" component={CGVLoginPage}/>
        <Route exact path="/cgv/lich-chieu" component={CGVLichChieu}/>
        <Route exact path="/cgv/pick-seat/:masuatchieu" component={CGVPickSeat}/>
        <Route exact path="/cgv/checkout" component={CGVCheckout}/>
        <Route exact path="/cgv/print-ticket" component={CGVPrintTicket}/>
        
        <Route exact path="/cgv/quan-ly-phim" component={CGVAdminQuanLyPhim}/>
        <Route exact path="/cgv/quan-ly-suat-chieu" component={CGVAdminQuanLySuatChieu}/>
        <Route exact path="/cgv/quan-ly-doanh-thu" component={CGVAdminQuanLyDoanhThu}/>

      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
