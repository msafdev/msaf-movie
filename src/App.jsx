// Libraries
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

// Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/Details";

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col">
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/search" element={<Results />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detail/:id" element={<Detail />}></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
