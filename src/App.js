import "./App.css";
import React from "react";
import { Routes, Route } from "react-router";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import PasswordConfirmationPage from "./pages/PasswordConfirmationPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="/reset-password" element={<PasswordConfirmationPage />} />
      </Routes>
    </div>
  );
}

export default App;
