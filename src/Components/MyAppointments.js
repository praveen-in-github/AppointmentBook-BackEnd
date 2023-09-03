import { useState } from "react";

import useFetch from "./FetchHook";
import ToastComponent from "./ToastComponent";
import "../static/MyAppointments.css";

export default function MyAppointments({ httpRequest }) {
  const [status, Appointments, setAppointments] = useFetch(
    httpRequest,
    "/bookings/",
    "get",
    ""
  );
  const [toastComponents, setToastComponents] = useState();

  function deleteAppointment(id) {
    httpRequest
      .delete(`/bookings/${id}`)
      .then(() => {
        setToastComponents(
          <ToastComponent
            key={new Date()}
            status="success"
            message="Appointment Deleted Successfully"
            timeout="5000"
          />
        );
        setAppointments(
          Appointments.filter((appointment) => {
            if (appointment._id == id) return false;
            else return true;
          })
        );
      })
      .catch((err) => {
        console.log("Error Occured");
        setToastComponents(
          <ToastComponent
            key={new Date()}
            status="error"
            message="Server Error.Please Try After Some Time"
            timeout="5000"
          />
        );
      });
  }
  console.log(status, " ", Appointments);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (status == "Fetching" || status == "Idle") {
    return "Loading";
  } else if (status == "Failed") {
    return "Error";
  } else {
    return (
      <>
        <div className="page-info-heading">My Appointments</div>

        <table>
          <tr>
            <th>Subject</th>
            <th>Appointment Start Date</th>
            <th>Appointment End Date</th>
            <th></th>
          </tr>
          {Appointments.map((appointment) => {
            return (
              <tr key="_id">
                <td>{appointment.Subject}</td>
                <td>
                  {new Date(appointment.AppointmentStartDate).toLocaleString(
                    "en-IN"
                  )}
                </td>
                <td>
                  {new Date(appointment.AppointmentEndDate).toLocaleString(
                    "en-IN"
                  )}
                </td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteAppointment(appointment._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
        {toastComponents}
      </>
    );
  }
}
