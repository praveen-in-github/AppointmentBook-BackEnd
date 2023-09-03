import { useMemo, useState } from "react";
import "../static/TimeSlotBooking.css";
export default function TimeSlotBooking({
  selectedDate,
  slots,
  appointmentStartTime,
  setAppointmentStartTime,
}) {
  let strt = 8;
  let allTimes = [];
  let appointmentDuration;
  let mnth = selectedDate.getMonth() + 1;

  let key =
    selectedDate.getFullYear() +
    "-" +
    (parseInt(mnth / 10) != 0 ? mnth : "0" + mnth) +
    "-" +
    selectedDate.getDate();
  console.log(slots, " ", key);
  let existingSlots;
  if (key in slots) {
    existingSlots = slots[key].slotTimes;
  }
  console.log(existingSlots);
  const startTimeData = intializeOnce();

  function intializeOnce() {
    let startTimes = [];
    while (strt < 20) {
      let minute = (strt - parseInt(strt)) * 60;
      allTimes.push(
        (parseInt(strt) == 12 ? 12 : parseInt(parseInt(strt) % 12)) +
          ":" +
          (parseInt(minute / 10).toString() + (minute % 10).toString()) +
          (strt / 12 > 1 || parseInt(strt) == 12 ? "PM" : "AM")
      );
      strt = strt + 0.25;
    }
    for (let j = 0; j < allTimes.length; j++) {
      let slotIsAvailable = true;
      if (existingSlots) {
        for (let i = 0; i < existingSlots.length; i++) {
          let slot = existingSlots[i];
          let start = new Date(slot.start);
          let close = new Date(slot.end);
          if (
            start.getFullYear() == selectedDate.getFullYear() &&
            start.getDate() == selectedDate.getDate() &&
            start.getMonth() == selectedDate.getMonth()
          ) {
            let time = [];
            if (allTimes[j].search("AM") != -1) {
              time = allTimes[j].replace("AM", "").split(":");
            } else {
              time = allTimes[j].replace("PM", "").split(":");
              if (time[0] == 12) {
                time[0] = 12;
              } else {
                time[0] = 12 + parseInt(time[0]);
              }
            }
            let allMinutes = parseInt(time[0]) * 60 + parseInt(time[1]);
            let user30Minutes = allMinutes + parseInt(30);
            let user60Minutes = allMinutes + parseInt(30);
            let slotStartMinutes = start.getHours() * 60 + start.getMinutes();
            let slotEndMinutes = close.getHours() * 60 + close.getMinutes();
            if (
              (allMinutes < slotStartMinutes &&
                (user30Minutes <= slotStartMinutes ||
                  user60Minutes <= slotStartMinutes)) ||
              allMinutes >= slotEndMinutes
            ) {
            } else {
              slotIsAvailable = false;
              break;
            }
          }
        }
      }
      if (slotIsAvailable) {
        startTimes.push(allTimes[j]);
      }
    }
    return startTimes;
  }

  function startTimeChanged(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target.value);
    setAppointmentStartTime(event.target.value);
  }

  return (
    <div className="time-container">
      <div className="time-element-group ">
        {startTimeData.map((startTime) => {
          return (
            <button
              className={
                appointmentStartTime == startTime
                  ? "time-btn time-btn-selected"
                  : "time-btn"
              }
              onClick={startTimeChanged}
              key={startTime}
              value={startTime}
            >
              {startTime}
            </button>
          );
        })}
      </div>
    </div>
  );
}
