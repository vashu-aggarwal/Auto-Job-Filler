import React, { useEffect, useState } from "react";
import Stepper from "./commonComponents/Stepper";
import SteperControl from "./commonComponents/SteperControl";
import { Outlet, useLocation } from "react-router-dom";

const MainContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const location = useLocation()

  useEffect(()=>{
    const path = location.pathname;
    const stepMatch = path.match(/\/step(\d+)/);
    if (stepMatch) {
      setCurrentStep(parseInt(stepMatch[1], 10));
    }
  }, [location])

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-10/12 mb-5">
      <div className="mt-5 ">
        <Stepper currentStep={currentStep} />
      </div>
      <Outlet/>
      <SteperControl currentStep={currentStep} />
    </div>
  );
};

export default MainContainer;
