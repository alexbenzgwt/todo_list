import React, { useState, useEffect } from "react";

function Verification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30); // countdown in seconds
  const [isExpired, setIsExpired] = useState(false);

  // Handle OTP input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // only digits
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (index < 3) document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsExpired(true);
    }
  }, [timer]);

  // Format time (00:30)
  const formatTime = (t) => {
    const minutes = String(Math.floor(t / 60)).padStart(2, "0");
    const seconds = String(t % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Verify OTP
  const handleVerify = (e) => {
    e.preventDefault();
    if (isExpired) {
      alert("OTP expired! Please resend a new one.");
      return;
    }
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      alert("✅ OTP Verified Successfully!");
    } else {
      alert("Please enter all 4 digits.");
    }
  };

  // Resend OTP
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(30);
    setIsExpired(false);
    alert("🔁 New OTP sent to your email!");
  };

  // Styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#fff",
      fontFamily: "Poppins, sans-serif",
    },
    logo: {
      width: "180px",
      marginBottom: "10px",
    },
    subtitle: {
      color: "#555",
      marginBottom: "40px",
      fontSize: "16px",
    },
    formBox: {
      backgroundColor: "#fff",
      border: "1px solid #f5b9b9",
      borderRadius: "12px",
      padding: "40px",
      textAlign: "center",
      width: "400px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#222",
    },
    paragraph: {
      color: "#555",
      fontSize: "15px",
      marginBottom: "25px",
    },
    otpContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "20px",
    },
    otpInput: {
      width: "50px",
      height: "50px",
      borderRadius: "8px",
      border: "1.5px solid #ccc",
      textAlign: "center",
      fontSize: "20px",
      outline: "none",
      transition: "all 0.3s ease",
    },
    timerText: {
      color: isExpired ? "red" : "#333",
      fontSize: "14px",
      marginBottom: "15px",
    },
    verifyButton: {
      backgroundColor: isExpired ? "#ccc" : "#e74c3c",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      width: "100%",
      padding: "15px",
      fontSize: "18px",
      cursor: isExpired ? "not-allowed" : "pointer",
      transition: "background 0.3s ease",
      marginBottom: "10px",
    },
    resendButton: {
      background: "none",
      border: "none",
      color: "#e74c3c",
      cursor: "pointer",
      fontSize: "14px",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <img src="./src/assets/logo.png" alt="Logo" style={styles.logo} />
      <p style={styles.subtitle}>Your freelance journey, made effortless</p>

      <div style={styles.formBox}>
        <h1 style={styles.heading}>Verification</h1>
        <p style={styles.paragraph}>
          Enter your 4-digit code that you received on your email
        </p>

        <div style={styles.otpContainer}>
          {otp.map((num, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength="1"
              value={num}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              style={styles.otpInput}
            />
          ))}
        </div>

        <div style={styles.timerText}>
          {isExpired ? "OTP expired ⏰" : `Expires in ${formatTime(timer)}`}
        </div>

        <button
          style={styles.verifyButton}
          disabled={isExpired}
          onClick={handleVerify}
        >
          Verify
        </button>

        <button
          style={styles.resendButton}
          onClick={handleResend}
          disabled={!isExpired}
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default Verification;
