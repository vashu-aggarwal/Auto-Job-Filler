import React from "react";
import logo from "../assets/welcome_img.png";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const goToStep1 = () => {
    navigate(`/step1`);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <img
          src={logo}
          alt="Welcome"
          className="mx-auto mb-4 w-20 h-20 object-cover"
        />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Auto Fill Job 
        </h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Thank you for choosing this site!
        </h2>
        <p className="text-gray-600 mb-6">
        We're thrilled to have you with us and are eager to assist you with all your needs.
        With our autofill feature, you can securely store and manage your information, making future interactions seamless and efficient. 
        </p>
        <button
          onClick={goToStep1}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
