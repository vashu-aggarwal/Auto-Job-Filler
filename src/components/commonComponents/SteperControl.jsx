import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { steps } from "../../constants/static_data";
import { useDispatch, useSelector } from "react-redux";
import {
  validateDocuments,
  validateEducationalDetails,
  validatePersonalInfo,
  validateTechSkills,
  validateWorkExperienceData,
} from "../../helperUtils/validateForms";
import { resetData } from "../../reduxData/formActions";

const SteperControl = ({ currentStep }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const fomrDetails = useSelector((state) => state.form.formData);

  const validateBeforeNext = () => {
    let error = "";
    switch (currentStep) {
      case 1: {
        return (error = validatePersonalInfo({
          userPersonalDetails: fomrDetails?.step1,
        }));
      }
      case 2: {
        return (error = validateEducationalDetails({
          educationalInfo: fomrDetails?.step2,
        }));
      }
      case 3: {
        return (error = validateWorkExperienceData({
          workExperienceDetails: fomrDetails?.step3,
        }));
      }
      case 4: {
        return (error = validateTechSkills({ techData: fomrDetails?.step4 }));
      }
      case 5: {
        return (error = validateDocuments({ documents: fomrDetails?.step5 }));
      }
      default: {
        return error;
      }
    }
  };

  const handleNext = () => {
    let isErr = validateBeforeNext();
    if (isErr) {
      setErrorMessage(isErr);
    } else if (currentStep < 6) {
      setErrorMessage("");
      navigate(`/step${currentStep + 1}`);
    } else {
      setErrorMessage("");
      dispatch(resetData())
      navigate(`/success`);
    }
  };

  const clearErr=()=>{
    setErrorMessage("")
  }

  return (
    <>
      <p className="mb-2 text-red-600 text-center py-2 font-semibold">
        {errorMessage}
      </p>
      <div className="container mt-5 mb-5 flex justify-center">
        <Link
          to={currentStep - 1 === 0 ? "/" : `/step${currentStep - 1}`}
          onClick={clearErr}
          className={`mx-4 rounded-lg border-2 border-slate-400 bg-white py-1.5 px-6 h-10 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-500 hover:text-white 
        ${
          currentStep === 1
            ? "pointer-events-none opacity-50"
            : "cursor-pointer "
        }`}
        >
          Back
        </Link>

        <button
          onClick={handleNext}
          className="cursor-pointer rounded-lg bg-indigo-700 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
        >
          {currentStep === steps.length ? "Confirm" : "Next"}
        </button>
      </div>
    </>
  );
};

export default SteperControl;
