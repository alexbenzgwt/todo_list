import React from "react";

function Forgot() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    logo: {
      width: "160px",
      marginBottom: "10px",
    },
    tagline: {
      color: "#4b4b4b",
      fontSize: "16px",
      marginBottom: "30px",
    },
    card: {
      width: "350px",
      border: "1px solid #f0b0a2",
      borderRadius: "15px",
      padding: "25px",
      textAlign: "left",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#000",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#555",
      marginBottom: "20px",
      lineHeight: "1.5",
    },
    label: {
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "8px",
      display: "block",
    },
    input: {
      width: "100%",
      padding: "12px",
      fontSize: "14px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      outline: "none",
      marginBottom: "20px",
    },
    button: {
      width: "100%",
      backgroundColor: "#E54E32",
      color: "#fff",
      border: "none",
      padding: "14px",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <img src="./src/assets/logo.png" alt="truedoit logo" style={styles.logo} />
      <p style={styles.tagline}>Your freelance journey, made effortless</p>

      <div style={styles.card}>
        <h2 style={styles.title}>Forgot Password</h2>
        <p style={styles.subtitle}>
          Enter your email for the verification process, we will send a 4-digit
          code to your email.
        </p>

        <label htmlFor="email" style={styles.label}>E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="enter email"
          style={styles.input}
        />

        <button style={styles.button}>Continue</button>
      </div>
    </div>
  );
}

export default Forgot;
