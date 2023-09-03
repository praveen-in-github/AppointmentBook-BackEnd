import "./Calender.css";
export default function Calender({
  year,
  month,
  setYear,
  setMonth,
  setDate,
  date,
  slots,
}) {
  function lowerYear(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    //event.preventDefault();
    setYear(year - 1);
  }
  function lowerMonth(event) {
    event.preventDefault();
    event.stopPropagation();
    if (month < 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  function higherYear(event) {
    event.preventDefault();
    event.stopPropagation();
    setYear(year + 1);
  }
  function higherMonth(event) {
    event.preventDefault();
    event.stopPropagation();
    if (month > 12) {
      setMonth(1);
      setYear(year + 1);
    } else setMonth(month + 1);
  }
  function getMonthFromInteger(month) {
    if (month === 0) return "Jan";
    else if (month === 1) return "Feb";
    else if (month === 2) return "Mar";
    else if (month === 3) return "Apr";
    else if (month === 4) return "May";
    else if (month === 5) return "Jun";
    else if (month === 6) return "Jul";
    else if (month === 7) return "Aug";
    else if (month === 8) return "Sep";
    else if (month === 9) return "Oct";
    else if (month === 10) return "Nov";
    else if (month === 11) return "Dec";
    else return "Dec";
  }

  function getAllTimes() {
    let arr = [];
    let strt = 8,
      ed = 20;
    while (strt < ed) {
      arr.push([parseInt(strt), (strt - parseInt(strt)) * 60]);
      strt += 0.25;
    }
    return arr;
  }
  const allTimes = getAllTimes();
  function isDateAvailable(cur_date) {
    let date = new Date(year, month, cur_date);
    let key = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    if (!slots[key]) return "date-available";
    for (let i = 0; i < allTimes.length; i++) {
      let cur = allTimes[0] * 60 + allTimes[1];
      for (let j = 0; j < slots[key].length; j++) {
        let st =
          slots[key].start.getMinutes() * 60 + slots[key].start.getHours();
        let ed = slots[key].end.getMinutes() * 60 + slots[key].end.getHours();
        if ((cur > st && cur >= ed) || (cur < st && cur < ed))
          return "date-available";
      }
    }
    return "nothing";
  }

  let todayDate = new Date();
  let weekDayOf1stMonth = new Date(year, month, 1).getDay();
  let numberofDaysInMonth = new Date(year, month + 1, 0).getDate();
  let daysJSX = [];
  todayDate.setMinutes(0);
  todayDate.setHours(0);
  todayDate.setSeconds(0);
  for (let i = 1; i <= numberofDaysInMonth; i++) {
    if (i === 1) {
      daysJSX.push(
        <div
          style={{
            gridColumnStart: weekDayOf1stMonth,
          }}
        >
          <button
            onClick={(event) => {
              console.log(i);
              event.preventDefault();
              event.stopPropagation();
              setDate(event, i);
            }}
            className={
              isDateAvailable(i) +
              (date === i ? " date-button date-selected" : " date-button")
            }
            disabled={new Date(year, month, date) >= todayDate}
          >
            {i}
          </button>
        </div>
      );
    } else {
      daysJSX.push(
        <div>
          <button
            className={
              isDateAvailable(i) +
              (date === i ? " date-button date-selected" : " date-button")
            }
            disabled={new Date(year, month, date) >= todayDate}
            onClick={(event) => {
              console.log(i);

              event.preventDefault();
              event.stopPropagation();
              setDate(event, i);
            }}
            style={{
              textAlign: "center",
              outline: "none",
              border: "none",
            }}
          >
            {i}
          </button>
        </div>
      );
    }
  }

  return (
    <>
      <div className="calender">
        <div className="controller">
          <button onClick={lowerYear}>&#60;&#60;</button>
          <button onClick={lowerMonth}>&#60;</button>
          <div className="header-desc">
            {getMonthFromInteger(month)} {year}
          </div>
          <button onClick={higherMonth}>&#62;</button>
          <button onClick={higherYear}>&#62;&#62;</button>
        </div>
        <div className="week-days">
          <div className="week-names">Mon</div>
          <div className="week-names">Tue</div>
          <div className="week-names">Wen</div>
          <div className="week-names">Thu</div>
          <div className="week-names">Fri</div>
          <div className="week-names">Sat</div>
          <div className="week-names">Sun</div>
          {daysJSX}
        </div>
      </div>
    </>
  );
}
