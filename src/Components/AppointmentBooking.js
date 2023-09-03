import { useState, useMemo } from "react";
import Calender from "./Calender";
import "../static/AppointmentBooking.css";
import TimeSlotBooking from "./TimeSlotBooking";
import ToastComponent from "./ToastComponent";
import useFetch from "./FetchHook";

export default function Appointment({ httpRequest }) {
  //let errorMessage;
  let curr_date = new Date();

  let cur_year = curr_date.getFullYear();
  let cur_month = curr_date.getMonth();
  let cur_date = curr_date.getDate();

  const [year, setYear] = useState(cur_year);
  const [month, setMonth] = useState(cur_month);
  const [date, setDate] = useState(cur_date);
  const [duration, setDuration] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [showOptions, setShowOptions] = useState(false);

  const [subject, setSubject] = useState();

  const [showDateInfo, setshowDateInfo] = useState(false);

  // Managing State of Time Slo Booking COmponent
  const [appointmentStartTime, setAppointmentStartTime] = useState();

  const [toastComponents, setToastComponents] = useState();

  function showCalenderInfo() {
    setshowDateInfo(true);
  }
  function checkDateIsFar(property) {}
  function dateAltered(event, date) {
    event.preventDefault();
    setDate(date);
  }
  function monthChanged(mon) {
    if (checkDateIsFar({ month: "mon" })()) {
    } else {
      setMonth(month);
    }
  }
  function yearChanged(yr) {}
  function formSubmitHandler(event) {
    let hs, ms;
    event.preventDefault();
    if (appointmentStartTime.search("AM") != -1) {
      let time = appointmentStartTime.replace("AM", "").trim().split(":");

      hs = time[0];
      ms = time[1];
    }
    if (appointmentStartTime.search("PM") != -1) {
      let time = appointmentStartTime.replace("PM", "").trim().split(":");

      if (time[0] == 12) {
        hs = time[0];
      } else {
        hs = time[0] + 12;
      }
      ms = time[1];
    }
    let appointmentDuration;
    if (duration && duration.search("hr") != -1) {
      appointmentDuration = duration.trim().replace("hr", "") * 60;
    } else {
      appointmentDuration = parseInt(duration.trim().replace("mins", ""));
    }
    let data = {
      Subject: subject,
      AppointmentStartDate: new Date(year, month, date, hs, ms),
      AppointmentEndDate: new Date(
        year,
        month,
        date,
        hs,
        ms + appointmentDuration
      ),
    };
    httpRequest
      .post(`/bookings/create`, data)
      .then((res) => {
        console.log(res);
        setToastComponents(
          <ToastComponent
            key={new Date()}
            status="success"
            message="Booking Created!!"
            timeout="5000"
          />
        );
      })
      .catch((err) => {
        console.log(err);
        setToastComponents(
          <ToastComponent
            key={new Date()}
            status="error"
            message="Server Error.Failed to Create Booking"
            timeout="5000"
          />
        );
      });
  }

  function durationChanged(value) {
    setDuration(value);
  }
  let selectedDate = new Date();
  let currentSelectData = new Date(year, month, date);
  console.log(currentSelectData.toString());
  const [status, slots] = useFetch(
    httpRequest,
    "/bookings/filter/" + currentSelectData.toString(),
    "get"
  );
  const slotsMap = useMemo(() => {
    let slotsMap = {};
    if (slots) {
      slots.map((doc) => {
        slotsMap[doc["_id"]] = doc;
      });
    }
    return slotsMap;
  }, [slots]);
  console.log("Slots are ", slots);
  return (
    <div>
      <div className="page-info-heading">Book Appointment Form</div>
      <form className="form-wrapper">
        <div className="form-element">
          <div className="form-label ">
            <label>Subject</label>
          </div>
          <div className="form-input">
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
          </div>
        </div>

        <div className="form-element form-element-date">
          <div>
            <div className="form-label form-label-mand">
              <label className="form-label-content">
                Select Appointment Date
              </label>
            </div>
            {<p className="error-msg">{errorMessage}</p>}
            <div className="date-booking">
              <Calender
                year={year}
                setDate={dateAltered}
                date={date}
                month={month}
                setYear={setYear}
                setMonth={setMonth}
                slots={slotsMap}
              />
            </div>
          </div>
          {status == "Fetched" && (
            <div>
              <div className="form-label form-label-mand">
                <label class="form-label-content">
                  Select Appointment slot
                </label>
              </div>
              <TimeSlotBooking
                selectedDate={currentSelectData}
                slots={slotsMap}
                appointmentStartTime={appointmentStartTime}
                setAppointmentStartTime={setAppointmentStartTime}
              />
            </div>
          )}
          {status == "Fetching" || status == "Idle" ? (
            <p>Loading</p>
          ) : status == "Failed" ? (
            <p>Couldnt Connect to Server</p>
          ) : (
            ""
          )}
        </div>

        <div className="form-element">
          <div className="form-label form-label-mand">
            <label className="form-label-content">Duration</label>
          </div>
          <div className="form-input">
            <div
              className="selection-box"
              onClick={() => {
                if (!showOptions) setShowOptions(true);
                else setShowOptions(false);
              }}
            >
              <div className="filter-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </div>

              {duration ? duration : "None"}
            </div>
            {showOptions && (
              <div className="selection-options">
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    durationChanged(30 + " mins");
                    setShowOptions(false);
                  }}
                >
                  30 mins
                </button>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    durationChanged(1 + " hr");
                    setShowOptions(false);
                  }}
                >
                  1 hr
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="submit-btn">
          <input type="submit" onClick={formSubmitHandler}></input>
        </div>
      </form>
      {toastComponents}
    </div>
  );
}
