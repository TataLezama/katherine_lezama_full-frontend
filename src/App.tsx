import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Search } from "./pages/search/Search";
import { Artist } from "./pages/artist/Artist";
import { MyAlbums } from "./pages/my-albums/MyAlbums";
import { Navbar } from './components/Navbar';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/my-albums" element={<MyAlbums />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
