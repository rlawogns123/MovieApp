import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import PopularMovie from "@/pages/PopularMoviePage";
import TopRatedMovie from "@/pages/TopRatedMoviePage";
import UpcomingMovie from "./pages/UpcomingMoviePage";
import MovieDetail from "./pages/MovieDetailPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<PopularMovie />} />
        <Route path="/top_rated" element={<TopRatedMovie />} />
        <Route path="/upcoming" element={<UpcomingMovie />} />
        <Route path="/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
