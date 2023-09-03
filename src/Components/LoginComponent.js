import { useState, useRef } from "react";

import { useNavigate } from "react-router-dom";

import "../static/LoginComponent.css";

export default function LoginComponent({ httpRequest }) {
  const [email, setEmail] = useState();
  const [otpScreen, setOtpScreen] = useState(false);
  const [emailErrorMessage, setEmailError] = useState();
  const [otp, setOtp] = useState([null, null, null, null]);
  const ref0 = useRef();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const [errorOTPMessage, setErrorOTPMessage] = useState();
  let refs = [ref0, ref1, ref2, ref3];

  const navigate = useNavigate();

  function nextClicked() {
    if (!otpScreen) {
      if (!email) {
        setEmailError("Please Enter Valid Email Address");
        return;
      }
      let result = email.search(".*@gmail.com");
      if (result === -1) {
        setEmailError("Please Enter Valid Email Address");
        return;
      } else {
        setEmailError("");
      }
      httpRequest
        .get(`/user/sendOtp/${email}`)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setOtpScreen(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = { otp: otp.toString().replaceAll(",", "") };
      httpRequest
        .post(`/user/verifyOtp`, data)
        .then((response) => {
          if (response.status === 200) {
            navigate("/bookAppointment");
          }
        })
        .catch((err) => {
          setErrorOTPMessage("Internal Server Error Occurred.Please try again");
        });
    }
  }
  function backBtnClicked() {
    setOtpScreen(false);
  }

  function emailChanged(event) {
    setEmail(event.target.value);
  }

  function digitChanged(event, index) {
    setOtp(
      otp.map((digit, pos) => {
        if (pos === index) {
          if (event.target.value !== "")
            return event.target.value.charAt(event.target.value.length - 1);
          else return "";
        } else return digit;
      })
    );
    if (index !== 3 && event.target.value !== "") {
      refs[index + 1].current.focus();
    }
  }
  function resendOtpHandler() {}

  return (
    <div className="login-holder">
      <h3>Sign In</h3>
      {!otpScreen && (
        <>
          <div className="form-element">
            <div className="form-label">Email Address</div>
            <div className="form-input">
              <input
                type="email"
                onChange={emailChanged}
                placeholder="Enter Email Address"
                value={email}
              />
            </div>
            <p className="error-message">{emailErrorMessage}</p>
          </div>

          <div className="button-holder">
            <input
              type="button"
              className="form-btn"
              value="Next"
              onClick={nextClicked}
            />
          </div>
        </>
      )}

      {otpScreen && (
        <>
          <button className="back-btn" onClick={backBtnClicked}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back
          </button>
          <div className="form-element form-element-otp">
            <div className="form-label">Enter Otp</div>
            <div className="form-input">
              <div className="otp-input">
                <input
                  type="text"
                  value={otp[0]}
                  ref={ref0}
                  onChange={(event) => {
                    digitChanged(event, 0);
                  }}
                />
                <input
                  type="text"
                  value={otp[1]}
                  ref={ref1}
                  onChange={(event) => {
                    digitChanged(event, 1);
                  }}
                />
                <input
                  type="text"
                  value={otp[2]}
                  ref={ref2}
                  onChange={(event) => {
                    digitChanged(event, 2);
                  }}
                />
                <input
                  type="text"
                  value={otp[3]}
                  ref={ref3}
                  onChange={(event) => {
                    digitChanged(event, 3);
                  }}
                />
              </div>
              <p className="error-message">{errorOTPMessage}</p>
            </div>
            <div className="input-error"></div>
          </div>
        </>
      )}
      <div className="btns-holder">
        {otpScreen && (
          <>
            <div className="resend-button-holder">
              <input
                type="button"
                className="resend-button"
                value="Resend OTP"
                onClick={resendOtpHandler}
              />
            </div>

            <div className="button-holder">
              <input
                type="button"
                className="form-btn"
                value="Next"
                onClick={nextClicked}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
