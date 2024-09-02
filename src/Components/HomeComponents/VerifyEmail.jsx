import React from "react";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";

const VerifyEmail = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleResendEmail = () => {
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          alert("Verification email sent!");
        })
        .catch((error) => {
          console.error("Error sending email verification:", error.message);
        });
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-[#5F35F5] to-[#5e34f58c] text-white">
      <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center text-blue-700">
        <FaEnvelopeOpenText className="text-6xl mb-6 animate-bounce" />
        <h1 className="text-3xl font-bold mb-4">Verify Your Email Address</h1>
        <p className="text-lg text-center mb-6">
          We've sent a verification link to your email address. Please check
          your inbox and follow the instructions to verify your account.
        </p>
        <button
          onClick={handleResendEmail}
          className="bg-[#5F34F5] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-all mb-4"
        >
          Resend Email
        </button>
        <button
          onClick={handleGoToLogin}
          className="text-blue-500 font-semibold py-2 px-4 rounded-full bg-white border border-blue-500 hover:bg-gray-100 transition-all"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
