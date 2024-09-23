import React from "react";
import { steps } from "../../constants/static_data";

const Stepper = ({ currentStep }) => {
  const showSteps = (
    <>
      {steps.map((ele, i) => {
        return (
          <div key={i} className={
            i !== steps.length - 1
              ? "w-full flex items-center"
              : "flex items-center"}>
            <div className="relative flex flex-col items-center text-blue-700">
              <div
                className={
                  (i + 1 === currentStep || ele.completed)
                    ? "rounded-full bg-indigo-700 transition duration-500 ease-in-out border-2 border-none outline-none h-12 w-12 flex justify-center items-center py-3 cursor-pointer text-white"
                    : "rounded-full transition duration-500 ease-in-out border-2 border-gray-400 h-12 w-12 flex justify-center items-center py-3 cursor-pointer"
                }
              >
                {!ele.completed ? <span className="font-semibold">{i + 1}</span> : <span className="text-white font-semibold">✓</span>}
              </div>
              <div className="w-full absolute top-0 text-center mt-16 text-sm font-medium">
                {ele.description}
              </div>
            </div>
            {i !== steps.length - 1 && (
              <div className="flex-auto border-t-2 border-blue-500 transition duration-500 ease-in-out"></div>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {showSteps}
    </div>
  );
};

export default Stepper;
