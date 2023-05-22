import axios from "axios";
import React, { useState, useEffect, isValidElement } from "react";
import ulgenLogo from "../Logo1.svg";
import Swal from "sweetalert2";

function PasswordConfirmationPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(null);
  const [isLengthValid, setIsLengthValid] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get("token"));
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsLengthValid(e.target.value.length >= 8);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    if (password === "" || confirmPassword === "") {
      displayMessage("empty-fields");
      return;
    }

    if (!token) {
      console.log("Token undefined.");
      return;
    }

    if (!isLengthValid) {
      displayMessage("length-error");
      return;
    }
    if (password !== confirmPassword) {
      displayMessage("password-mismatch");
      return;
    } else {
      try {
        const response = await axios.post(
          process.env.REACT_APP_RESET_PASSWORD_URL,
          {
            token: token,
            newPassword: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log("Password is successfully reset");
          displayMessage("success");
          setConfirmPassword("");
          setPassword("");
        } else {
          console.log("Error resetting password", response);
          displayMessage("error");
        }
      } catch (error) {
        console.log("Error resetting password", error);
        displayMessage("error");
      }
    }
  };

  const displayMessage = (type) => {
    if (type === "length-error") {
      Swal.fire({
        icon: "warning",
        title: "Şifreniz 8 haneden daha fazla olmalıdır",
        text: "",
        confirmButtonColor: "#34548E",
        confirmButtonText: "Tamam",
      });
    } else if (type === "success") {
      Swal.fire({
        icon: "success",
        title: "Şifreniz başarıyla değiştirildi!",
        text: "Artık yeni şifrenizle Ülgen'i kullanabilirsiniz.",
        confirmButtonColor: "#34548E",
        confirmButtonText: "Tamam",
      });
    } else if (type === "password-mismatch") {
      Swal.fire({
        icon: "warning",
        title: "Şifreniz eşleşmiyor.",
        text: "",
        confirmButtonColor: "#34548E",
        confirmButtonText: "Tamam",
      });
    } else if (type === "empty-fields") {
      Swal.fire({
        icon: "warning",
        title: "Tüm alanları doldurmalısınız.",
        text: "",
        confirmButtonColor: "#34548E",
        confirmButtonText: "Tamam",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Geçersiz veya kullanılmış bağlantı.",
        text: "Lütfen bağlantının doğru olduğundan emin olun.",
        confirmButtonColor: "#34548E",
        confirmButtonText: "Tamam",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ paddingTop: "20vh" }}
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
          </div>
        </div>
        <div className="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            style={{
              background: "linear-gradient(to right, #8AB2CB, #082266)",
              borderColor: "#082266",
              color: "#FFF4E6",
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
