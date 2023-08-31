import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Home from "@/pages/Home/Home";
import PopularMoviePage from "@/pages/PopularMoviePage";
import TopRatedMoviePage from "@/pages/TopRatedMoviePage";
import UpcomingMoviePage from "@/pages/UpcomingMoviePage";
import MovieDetailPage from "@/pages/Detail/MovieDetailPage";
import SearchMoviePage from "@/pages/Search/SearchMoviePage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<PopularMoviePage />} />
        <Route path="/top_rated" element={<TopRatedMoviePage />} />
        <Route path="/upcoming" element={<UpcomingMoviePage />} />
        <Route path="/:id" element={<MovieDetailPage />} />
        <Route path="/search" element={<SearchMoviePage />} />
      </Routes>
    </Router>
  );
}

export default App;
