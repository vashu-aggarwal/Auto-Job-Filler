import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialLevelsOfEdu } from "../constants/static_data";
import { updateForm } from "../reduxData/formActions";
import { FaUniversity, FaGraduationCap } from "react-icons/fa";
import useDebounce from "../helperUtils/useDebounce";
import InputField from "./commonComponents/InputField";

const EducationalDetails = () => {
  const [educationalDataArr, setEducationalDataArr] = useState([
    ...initialLevelsOfEdu,
  ]);
  const [isPostGradChecked, setIsPostGradChecked] = useState(false);
  const [maxDate, setMaxDate] = useState();
  const dispatch = useDispatch();
  const educationDetails = useSelector((state) => state.form.formData?.step2);

  useEffect(() => {
    let d = new Date();
    const y = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const date = String(d.getDate()).padStart(2, "0");
    let todayDate = `${y}-${month}-${date}`;
    setMaxDate(todayDate);
  }, []);

  useEffect(() => {
    if (educationDetails) {
      if (educationDetails.find((ele) => ele.level === "Post Graduation")) {
        setIsPostGradChecked(true);
      }
      setEducationalDataArr(educationDetails);
    }
  }, [educationDetails]);

  const handleCheckboxChange = (e) => {
    setIsPostGradChecked(!isPostGradChecked);
    let temp = [...educationalDataArr];
    let resArr = [];
    if (
      !educationalDataArr.some((entry) => entry.level === "Post Graduation")
    ) {
      const newEntry = {
        id: 4,
        level: "Post Graduation",
        university: "",
        percentage: "",
        yearOfPassing: "",
      };
      resArr = [...temp, newEntry];
    } else {
     
      resArr = temp.filter((entry) => entry.level !== "Post Graduation");
    }
    setEducationalDataArr(resArr);
    debouncedUpdateFormData(resArr);
  };

  const debouncedUpdateFormData = useDebounce((data) => {
    dispatch(updateForm("step2", data));
  }, 500);

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    let tempEduArr = [...educationalDataArr];

    tempEduArr = tempEduArr.map((entry) =>
      entry.id === id ? { ...entry, [name]: value } : entry
    );
    setEducationalDataArr(tempEduArr);
    debouncedUpdateFormData(tempEduArr);
  };

  return (
    <div className="mt-20 mx-auto lg:max-w-6xl md:max-w-4xl bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="p-4 bg-gray-200 shadow rounded mx-4 mb-4">
        <label className="flex space-x-3 items-center">
          <input
            type="checkbox"
            checked={isPostGradChecked}
            onChange={handleCheckboxChange}
            className="form-checkbox h-4 w-4 text-blue-500 bg-gray-200 border-gray-300 rounded-sm focus:ring-blue-500"
          />
          <span className="font-semibold text-gray-700">
            Have you done post graduation
          </span>
        </label>
      </div>
      {educationalDataArr &&
        educationalDataArr?.length > 0 &&
        educationalDataArr.map((ele, i) => (
          <div
            key={ele.id}
            className="bg-white shadow rounded-lg p-4 mx-4 mb-4"
          >
            <p className="text-lg font-semibold text-gray-800 mb-2">
              {ele.level} - {ele.id}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              <div className="relative">
                <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-1">
                  University
                </p>
                <div className="flex items-center border border-gray-200 rounded bg-white py-1">
                  <FaUniversity className="absolute left-3 text-gray-500" />
                  <InputField
                      handleChange={(e) => handleInputChange(e, ele.id)}
                      val={ele.university}
                      Name="university"
                      Placeholder="University"
                      className="w-full pl-10 appearance-none p-1 px-2 text-gray-800 outline-none"
                      maxLen="50"
                      type="text"
                    />
                </div>
              </div>

              <div className="relative">
                <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-1">
                  Grades/Percentage
                </p>
                <div className="flex items-center border border-gray-200 rounded bg-white py-1">
                  <FaGraduationCap className="absolute left-3 text-gray-500" />
                  <InputField
                      handleChange={(e) => handleInputChange(e, ele.id)}
                      val={ele.percentage}
                      Name="percentage"
                      Placeholder="Percentage"
                      className="w-full pl-10 appearance-none p-1 px-2 text-gray-800 outline-none"
                      type="number"
                    />

                </div>
              </div>

              <div className="relative">
                <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-1">
                  Completion Date
                </p>
                <div className="flex items-center border border-gray-200 rounded bg-white py-1">
                  <InputField
                      handleChange={(e) => handleInputChange(e, ele.id)}
                      val={ele.yearOfPassing}
                      Name="yearOfPassing"
                      className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                      type="date"
                      maxDate={maxDate}
                      onKeyDown={(e)=>e.preventDefault()}
                    />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default EducationalDetails;
