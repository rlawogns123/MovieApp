import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PopularMoviePage from "@/pages/PopularMoviePage";
import TopRatedMoviePage from "@/pages/TopRatedMoviePage";
import UpcomingMoviePage from "@/pages/UpcomingMoviePage";
import MovieDetailPage from "@/pages/MovieDetailPage";
import SearchMoviePage from "@/pages/SearchMoviePage";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import HeaderScrollUp from "@/components/header/HeaderScrollUp";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HeaderScrollUp />}>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<PopularMoviePage />} />
          <Route path="/top_rated" element={<TopRatedMoviePage />} />
          <Route path="/upcoming" element={<UpcomingMoviePage />} />
          <Route path="/:id" element={<MovieDetailPage />} />
          <Route path="/search/:searchWord" element={<SearchMoviePage />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
