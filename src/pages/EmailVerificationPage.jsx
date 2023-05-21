import React, { useState, useEffect } from "react";
import ulgenLogo from "../Logo1.svg";
import axios from "axios";

function EmailVerificationPage() {
  const [token, setToken] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setToken(urlParams.get("token"));
  }, []);

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    if (!token) {
      console.log("Token undefined.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_VERIFY_EMAIL_URL}?token=${token}`
      );

      if (response.status === 200) {
        setIsVerified(true);
        console.log("Verify confirmed");
        setShowErrorMessage(false);
      } else {
        setShowErrorMessage(true);
        console.log("Error", response);
      }
    } catch (error) {
      setShowErrorMessage(true);
      console.log("Error", error);
    }
  };
  return (
    <div className="email-verification-wrapper">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-12">
            <img src={ulgenLogo}></img>
          </div>
          {isVerified && (
            <div className="col-md-8" style={{ paddingTop: "15px" }}>
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">E-mailiniz onaylandı!</h4>
                <p>
                  Aramıza hoş geldiniz, artık Ülgen'i rahatlıkla
                  kullanabilirsiniz.
                </p>
              </div>
            </div>
          )}
          {showErrorMessage && (
            <div className="col-md-8" style={{ paddingTop: "15px" }}>
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">E-mail onaylamanız başarısız!</h4>
                <p>
                  Süresi dolmuş veya geçersiz bağlantı, lütfen tekrar deneyiniz.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
