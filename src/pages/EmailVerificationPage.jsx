import React from "react";
import ulgenLogo from "../Logo1.svg";

function EmailVerificationPage() {
  return (
    <div className="email-verification-wrapper">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-12">
            <img src={ulgenLogo}></img>
          </div>
          <div className="col-md-8" style={{ paddingTop: "15px" }}>
            <div className="alert alert-success" role="alert">
              <h4 className="alert-heading">E-mailiniz onaylandı!</h4>
              <p>
                Aramıza hoş geldiniz, artık Ülgen uygulamamızı rahatlıkla
                kullanabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
