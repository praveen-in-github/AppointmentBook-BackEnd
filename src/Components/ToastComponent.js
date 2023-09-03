import { useState, useRef } from "react";
import "../static/ToastComponent.css";
export default function ToastComponent({ status, message, timeout }) {
  const [showComponent, setShowComponent] = useState(true);
  function closeToast() {
    console.log("Button ");
    clearTimeout(timeOutId);
    setShowComponent(false);
  }

  function schedule() {
    let id = setTimeout(() => {
      setShowComponent(false);
    }, 500000);
    console.log("id is ", id);
    return id;
  }
  console.log("Component ", showComponent, " messsage: ", message);
  const timeOutId = useRef(schedule());

  return (
    showComponent && (
      <div
        className={
          status == "success"
            ? "toast-container toast-container-success"
            : "toast-container toast-container-error"
        }
      >
        <p>{message}</p>
        <button className="close-btn" onClick={closeToast}>
          X
        </button>
      </div>
    )
  );
}
