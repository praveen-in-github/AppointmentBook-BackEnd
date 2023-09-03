import Appointment from "./Components/AppointmentBooking";
import LoginComponent from "./Components/LoginComponent";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBarComponent from "./Components/NavBarComponent";
import axios from "axios";
import MyAppointments from "./Components/MyAppointments";
import { useRef, useState } from "react";

export default function App() {
  const httpRequest = useRef(
    axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    })
  );
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <NavBarComponent httpRequest={httpRequest.current} />
      <Routes>
        <Route
          path="/login"
          element={
            <LoginComponent
              setLoggedIn={setLoggedIn}
              httpRequest={httpRequest.current}
            />
          }
        ></Route>
        <Route
          path="/bookAppointment"
          element={<Appointment httpRequest={httpRequest.current} />}
        ></Route>
        <Route
          path="/myAppointments"
          element={<MyAppointments httpRequest={httpRequest.current} />}
        ></Route>
      </Routes>
    </Router>
  );
}
