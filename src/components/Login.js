import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      axios({
        method: "post",
        url: `${BASE_URL}/auth`,
        headers: { "Access-Control-Allow-Origin": "*" },
        data: {
          username,
          password,
        },
      })
        .then((res) => {
          localStorage.setItem("ACCESS_TOKEN", res.data.token);
          localStorage.setItem("USER_TYPE", res.data.userType);
          navigate("/home", { replace: true });
        })
        .catch((err) => {
          alert(err.response.data.errors[0].msg);
        });
    } else {
      alert("Please Enter Username and password");
    }
  };

  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center mt-3">User Registration - Sign Up</h3>
            <div className="card-body">
              <form onSubmit={(e) => submitForm(e)}>
                <div className="form-group">
                  <label className="mb-1"> User Name </label>
                  <input
                    placeholder="User Name"
                    name="userName"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="form-group mt-3">
                  <label className="mb-1"> Password: </label>
                  <input
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-dark mt-3"
                    style={{ float: "left" }}
                    type="submit"
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-outline-dark mt-3"
                    style={{ float: "right" }}
                    onClick={() => navigate("/signup", { replace: true })}
                  >
                    Go to Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
