import { Link } from "react-router-dom";
import "../static/styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBarComponent({ httpRequest, loggedIn }) {
  const [reRender, setReRender] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <h3>Appointment Booking</h3>
      {loggedIn && (
        <ul className="nav-items">
          <li className="nav-item">
            <Link
              to="/bookAppointment"
              onClick={() => {
                setReRender(true);
              }}
              className={
                window.location.pathname === "/bookAppointment" ? "active" : ""
              }
            >
              Book Appointment
            </Link>
          </li>
          <li>
            <Link
              to="/myAppointments"
              onClick={() => {
                setReRender(true);
              }}
              className={
                window.location.pathname === "/myAppointments" ? "active" : ""
              }
            >
              My Appointments
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                httpRequest
                  .patch("/user/logout")
                  .then(() => {
                    navigate("/login");
                  })
                  .catch((err) => {
                    console.log(err);
                    navigate("/login");
                  });
              }}
              className={window.location.pathname === "/logout" ? "active" : ""}
            >
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
