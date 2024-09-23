import React, { useEffect, useState } from "react";
import InputField from "./commonComponents/InputField";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../helperUtils/useDebounce";
import { updateForm } from "../reduxData/formActions";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaMapPin,
  FaCity,
} from "react-icons/fa";

const PersonalInfo = () => {
  const [userPersonalData, setUserPersonalData] = useState({
    Name: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
    city: "",
  });
  const dispatch = useDispatch();
  const userPersonalPrefilledData = useSelector(
    (state) => state.form.formData?.step1
  );

  useEffect(() => {
    if (userPersonalPrefilledData) {
      setUserPersonalData(userPersonalPrefilledData);
    }
  }, [userPersonalPrefilledData]);

  const debouncedUpdateFormData = useDebounce((data) => {
    dispatch(updateForm("step1", data));
  }, 500);

  const handleInputChange = (e) => {
    const tempUserData = { ...userPersonalData };
    let value = e.target.value;
    if (e.target.name === "phone" && value.toString().length > 10) {
      value = value.slice(0, 10);
    } else if (e.target.name === "pinCode" && value.toString().length > 6) {
      value = value.slice(0, 6);
    }
    tempUserData[e.target.name] = value;
    setUserPersonalData(tempUserData);

   
    debouncedUpdateFormData(tempUserData);
  };

  return (
    <div className="mt-20 mx-auto bg-gray-100 p-6 rounded-lg shadow-md max-w-xs sm:max-w-xl md:max-w-4md lg:max-w-6lg xl:max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="relative">
          <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-1">
            Full Name
          </p>
          <div className="flex items-center border border-gray-200 rounded bg-white py-1">
            <FaUser className="absolute left-3 text-gray-500" />
            <InputField
              handleChange={handleInputChange}
              val={userPersonalData?.Name || ""}
              Name="Name"
              Placeholder="Full Name"
              className="w-full pl-10 appearance-none p-1 px-2 text-gray-800 outline-none"
              maxLen="150"
              type="text"
            />
          </div>
        </div>

        <div className="relative">
          <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-1">
            Mobile Number
          </p>
          <div className="flex items-center border border-gray-200 rounded bg-white py-1">
            <FaPhone className="absolute left-3 text-gray-500" />
            <InputField
              handleChange={handleInputChange}
              val={userPersonalData?.phone || ""}
              Name="phone"
              Placeholder="Mobile Number"
              className="w-full pl-10 appearance-none p-1 px-2 text-gray-800 outline-none"
              type="number"
            />
          </div>
        </div>

        <div className="relative">
          <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-1">
            Email Id
          </p>
          <div className="flex items-center border border-gray-200 rounded bg-white py-1">
            <FaEnvelope className="absolute left-3 text-gray-500" />
            <InputField
              handleChange={handleInputChange}
              val={userPersonalData?.email || ""}
              Name="email"
              Placeholder="Email Id"
              className="w-full pl-10 appearance-none p-1 px-2 text-gray-800 outline-none"
              type="email"
            />
          </div>
        </div>

        <div className="relative">
          <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-1">
            Address
          </p>
          <div className="flex items-center border border-gray-200 rounded bg-white py-1">
            <FaHome className="absolute left-3 text-gray-500" />
            <InputField
              handleChange={handleInputChange}
              val={userPersonalData?.address || ""}
              Name="address"
              Placeholder="Address"
              className="w-full pl-10 appearance-none p-1 px-2 text-gray-800 outline-none"
              maxLen="150"
              type="text"
            />
          </div>
        </div>

        <div className="relative">
          <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-1">
            Pincode
          </p>
          <div className="flex items-center border border-gray-200 rounded bg-white py-1">
            <FaMapPin className="absolute left-3 text-gray-500" />
            <InputField
              handleChange={handleInputChange}
              val={userPersonalData?.pinCode || ""}
              Name="pinCode"
              Placeholder="Pinode"
              className="w-full pl-10 appearance-none p-1 px-2 text-gray-800 outline-none"
              maxLen="6"
              type="number"
            />
          </div>
        </div>

        <div className="relative">
          <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-1">
            City
          </p>
          <div className="flex items-center border border-gray-200 rounded bg-white py-1">
            <FaCity className="absolute left-3 text-gray-500" />
            <InputField
              handleChange={handleInputChange}
              val={userPersonalData?.city || ""}
              Name="city"
              Placeholder="City"
              className="w-full pl-10 appearance-none p-1 px-2 text-gray-800 outline-none"
              maxLen="50"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
