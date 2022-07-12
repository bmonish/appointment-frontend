import React, { useEffect, useState } from "react";
import { BASE_URL } from "./constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const HomePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [userType, setUserType] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    setUserType(localStorage.getItem("USER_TYPE"));
    axios({
      method: "get",
      url: `${BASE_URL}/appointment/myappointments`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": localStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((res) => res.data)
      .then((data) => setAppointments(data))
      .catch((err) => {
        alert(err.response.data.errors[0].msg);
      });
  }, []);

  const handleEdit = (appointmentId) => {
    navigate(`/book-appointment?id=${appointmentId}`);
  };

  const handleDelete = (appointmentId) => {
    axios({
      method: "delete",
      url: `${BASE_URL}/appointment/${appointmentId}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": localStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((res) => res.data)
      .then(() => {
        setAppointments(
          appointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
      })
      .catch((err) => {
        alert(err.response.data.errors[0].msg);
      });
  };
  return (
    <div>
      <div className="container mt-3">
        <div className="row align-items-center">
          <div className="col">
            <div className="display-3 text-primary">Welcome</div>
          </div>
          <div className="col d-flex justify-content-end">
            <div className="ml-auto text-right">
              {userType === "patient" && (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    navigate("/book-appointment");
                  }}
                >
                  Book an Appointment
                </button>
              )}
              <button
                className="btn btn-outline-danger mx-4"
                onClick={() => {
                  localStorage.removeItem("ACCESS_TOKEN");
                  localStorage.removeItem("USER_TYPE");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="h6 mb-4">Your Appointments</div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">
                  {userType === "patient" ? "Doctor" : "Patient"}
                </th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(
                ({ _id, date, title, patient, doctor, price }, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{moment(date).format("DD-MM-YYYY")}</td>
                    <td>{title}</td>
                    <td>
                      {userType === "patient"
                        ? doctor.username
                        : patient.username}
                    </td>
                    <td>{price}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary mr-3"
                        onClick={() => handleEdit(_id)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="btn btn-outline-danger ml-3"
                        onClick={() => handleDelete(_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
