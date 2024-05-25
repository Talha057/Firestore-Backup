import "./login.css";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "bootstrap";

const LoginScreen = () => {
  const [name, setName] = useState("");
  const [password, setPass] = useState("");

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const login = () => {
    axios
      .post(
        "https://firestorebackupbackend-git-main-talhas-projects-6376b52b.vercel.app/login",
        {
          name,
          password,
        }
      )
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/managebackup");
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data.message === "Incorrect username and password") {
          setError(true);
        } else {
          alert("Server Error");
        }
      });
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mainheading ">Firestore Backup</h3>
                <hr style={{ color: "gray" }}></hr>
                <h3 className="mb-5">Login</h3>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="typeEmailX-2"
                    placeholder="Name"
                    className="form-control form-control-lg shadow-none"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    placeholder="Password"
                    className="form-control form-control-lg shadow-none"
                    onChange={(e) => setPass(e.target.value)}
                  />

                  {error && (
                    <div className="mt-4 d-flex ">
                      <span className="px-3" style={{ color: "red" }}>
                        Username or Password is incorrect
                      </span>
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                  onClick={login}
                >
                  Login
                </button>

                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
