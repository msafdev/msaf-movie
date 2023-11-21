import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import { useNavigate, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Login.css"; 

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
      navigate("/"); // Mengarahkan ke halaman home setelah login berhasil
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
                <p className="text-red-500">Email dan password salah</p>
              )}
              <form onSubmit={handleSubmit}>
                <h3 className="mb-5 font-bold text-center text-2xl">LOG IN</h3>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Email
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Enter your email"
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
                  <button type="submit" class="btn btn-primary">
                    Submit
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
