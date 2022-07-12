import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./constants";
import axios from "axios";
import Select from "react-select";

const BookAppointment = () => {
  let navigate = useNavigate();

  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [doctor, setDoctor] = useState("");
  const [price, setPrice] = useState("");
  const [availableDoctors, setAvailableDoctors] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${BASE_URL}/users/doctors`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": localStorage.getItem("ACCESS_TOKEN"),
      },
    })
      .then((res) => res.data)
      .then((data) =>
        data.map((doctor) => ({ label: doctor.username, value: doctor._id }))
      )
      .then((formattedData) => setAvailableDoctors(formattedData))
      .catch((err) => {
        alert(err.response.data.errors[0].msg);
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${BASE_URL}/appointment`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "x-auth-token": localStorage.getItem("ACCESS_TOKEN"),
      },
      data: {
        date,
        title,
        doctor: doctor.value,
        price,
      },
    })
      .then((res) => res.data)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        alert(err.response.data.errors[0].msg);
      });
  };

  return (
    <div>
      <div className="container mt-3">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center mt-3">Appointment Booking</h3>
            <div className="card-body">
              <form onSubmit={(e) => submitForm(e)}>
                <div className="form-group">
                  <label className="mb-1">Appointment Date </label>
                  <input
                    placeholder="User Name"
                    name="userName"
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="form-group mt-3">
                  <label className="mb-1">Title</label>
                  <input
                    placeholder="Title"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="mb-1">Doctor</label>
                  <Select
                    options={availableDoctors}
                    value={doctor}
                    onChange={(e) => setDoctor(e)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="mb-1">Price</label>
                  <input
                    placeholder="Enter Price"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-dark mt-3"
                    style={{ float: "left" }}
                    type="submit"
                  >
                    Book Appointment
                  </button>
                  <button
                    className="btn btn-outline-dark mt-3"
                    style={{ float: "right" }}
                    onClick={() => navigate("/home", { replace: true })}
                  >
                    Go Back
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

export default BookAppointment;
