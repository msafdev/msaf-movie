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
import Detail from "./pages/Detail";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="242068768655-bpqh2n4cso8fskus2qs4d73jma0qt9a1.apps.googleusercontent.com">
        <div className="min-h-screen w-full flex flex-col">
          <Navbar />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Results />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </div>
        <Footer />
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
