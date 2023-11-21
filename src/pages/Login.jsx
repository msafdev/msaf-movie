import React, { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Login.css"; // Buat file CSS terpisah untuk tata letak khusus login

// ... (kode lainnya)

export default function Login() {
  const { setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  const [correctAuth, setCorrectAuth] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      navigate("/movies"); // Mengarahkan ke halaman home setelah login berhasil
    } else {
      setCorrectAuth(false);
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-danger">
            <div className="40-w p-5 rounded bg-white animated fadeIn">
              {!correctAuth && (
                <p className="text-red-500">Wrong username or password</p>
              )}
              <form onSubmit={handleSubmit}>
                <h3 className="mb-4">Sign In</h3>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Enter your username"
                    className="form-control"
                    required={true}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="form-control"
                    required={true}
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary" type="submit">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
