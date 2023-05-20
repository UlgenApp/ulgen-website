import axios from "axios";
import React, { useState, useEffect } from "react";
import ulgenLogo from "../Logo1.svg";

function PasswordConfirmationPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMatch, setIsMatch] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get("token"));
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsEmpty(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsEmpty(false);
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      setIsEmpty(true);
      return;
    }

    if (password !== confirmPassword) {
      setIsMatch(false);
      return;
    } else {
      setIsMatch(true);
      try {
        const response = await axios.post(
          process.env.REACT_APP_RESET_PASSWORD_URL,
          {
            token: token,
            newPassword: password,
          }
        );

        if (response.status === 200) {
          console.log("Password is successfully reset");
        } else {
          console.log("Error resetting password", response);
        }
      } catch (error) {
        console.log("Error resetting password", error);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ marginTop: "20vh" }}
    >
      <form
        className="row g-3 needs-validation"
        onSubmit={resetPassword}
        noValidate
      >
        <div className="col-md-12">
          <img src={ulgenLogo}></img>
        </div>
        <div className="col-md-12">
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="examplepassword"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <label htmlFor="password">Yeni Şifreniz</label>
            {isEmpty && password === "" && (
              <div className="text-danger">Bu alan doldurulmalı.</div>
            )}
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="examplepasswordconfirm"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <label htmlFor="confirmPassword">Yeni Şifrenizi Onaylayınız</label>
            {isEmpty && confirmPassword === "" && (
              <div className="text-danger">Bu alan doldurulmalı.</div>
            )}
            {!isMatch && (
              <div className="text-danger">Şifreniz Eşleşmiyor.</div>
            )}
          </div>
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            style={{
              background: "linear-gradient(to right, #8AB2CB, #082266)",
              borderColor: "#FFFFFF",
              color:
                "#FFF4E6" /* Set text color to white for better visibility */,
            }}
          >
            Şifreyi Değiştir
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordConfirmationPage;
