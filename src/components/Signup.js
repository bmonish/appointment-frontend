import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./constants";
import { useHistory } from "react-router";

const Signup = () => {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (
      userType.toLowerCase() === "doctor" ||
      userType.toLowerCase() === "patient"
    ) {
      axios({
        method: "post",
        url: `${BASE_URL}/users`,
        headers: { "Access-Control-Allow-Origin": "*" },
        data: {
          username,
          password,
          userType: userType.toLowerCase(),
        },
      }).then((res) => {
        history.push("/login");
      });
    } else {
      alert("Role can either be 'doctor' or 'patient'");
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
                <div className="form-group mt-3">
                  <label className="mb-1">
                    {" "}
                    Role Name: ("doctor" or "patient")
                  </label>
                  <input
                    placeholder="Role Name"
                    name="roleName"
                    className="form-control"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-dark mt-3"
                    style={{ float: "left" }}
                    type="submit"
                  >
                    Sign up
                  </button>
                  <a className="mt-3" style={{ float: "right" }} href="/login">
                    Already a member?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
