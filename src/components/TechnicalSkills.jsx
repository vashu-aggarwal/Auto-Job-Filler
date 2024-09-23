import React, { useEffect, useState } from "react";
import InputField from "./commonComponents/InputField";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../reduxData/formActions";
import useDebounce from "../helperUtils/useDebounce";
import { FaPlus,   } from "react-icons/fa";
import { AiOutlineClose } from 'react-icons/ai';

const TechnicalSkills = () => {
  // Used same key name to access states using key name
  const [techSkills, setTechSkills] = useState({
    tech: [],
    certificate: [],
  });
  const [skillInput, setSkillInput] = useState({
    tech: "",
    certificate: "",
  });
  const [err, setErr] = useState({
    tech:"",
    certificate:""
  })
  const dispatch = useDispatch()
  const techSkillsData = useSelector((state)=> state.form.formData?.step4)

  useEffect(()=>{
    if(techSkillsData){
      setTechSkills(techSkillsData)
    }
  },[techSkillsData])

  const debouncedUpdateFormData = useDebounce(
    (data) => {
      dispatch(updateForm('step4', data));
    },
    500
  );

  const handleInputChange = (e) => {
    let temp = { ...skillInput };
    temp[e.target.name] = e.target.value;
    setSkillInput(temp);
    setErr({
      tech:"",
      certificate:""
    })
  };

  const addSkill = (type) => {
    let tempErr = {...err}
    let temp = {...techSkills}
    if(!skillInput[type]){
     tempErr[type] = `Please enter ${type} skill`
     setErr(tempErr)
    }
    else{
      temp[type].push(skillInput[type])
      setTechSkills(temp)
      setSkillInput({
        tech: "",
        certificate: "",
      })
      setErr({
        tech:"",
        certificate:""
      })
      debouncedUpdateFormData(temp)
    }
  };

  const deleteSkillOrCertificate = (type, index) => {
    let temp = { ...techSkills };
    temp[type].splice(index, 1);
    setTechSkills(temp);
    debouncedUpdateFormData(temp)
  };

  return (
    <div className="mt-20 mx-5 bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-2">
            Add your skill
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 rounded border border-gray-200 bg-white p-1">
              <InputField
                handleChange={(e) => handleInputChange(e)}
                val={skillInput.tech}
                Name="tech"
                Placeholder="Enter your technical skills"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                maxLen="50"
                type="text"
              />
            </div>
            <button
              onClick={() => addSkill('tech')}
              className="h-10 bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold uppercase flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
            >
              <FaPlus />
              Add
            </button>
          </div>
          <p className="text-red-500">{err.tech}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-2">
            Add your certifications
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 rounded border border-gray-200 bg-white p-1">
              <InputField
                handleChange={(e) => handleInputChange(e)}
                val={skillInput.certificate}
                Name="certificate"
                Placeholder="Enter certificate Name"
                className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
                maxLen="150"
                type="text"
              />
            </div>
            <button
              onClick={() => addSkill('certificate')}
              className="h-10 bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold uppercase flex items-center gap-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
            >
              <FaPlus />
              Add
            </button>
          </div>
          <p className="text-red-500">{err.certificate}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {techSkills?.tech && techSkills?.tech.length > 0 && (
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-2">
              Technical Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {techSkills?.tech.map((ele, i) => (
                <button
                  key={i}
                  className="flex items-center bg-gray-300 text-gray-800 rounded-full py-2 px-4 text-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <span className="mr-2">{ele}</span>
                  <AiOutlineClose 
                    onClick={() => deleteSkillOrCertificate('tech', i)}
                    className="text-xs cursor-pointer hover:text-red-500"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {techSkills?.certificate && techSkills?.certificate.length > 0 && (
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-xs font-bold uppercase leading-8 text-gray-500 mb-2">
              Certifications
            </p>
            <div className="flex flex-wrap gap-2">
              {techSkills?.certificate.map((ele, i) => (
                <button
                  key={i}
                  className="flex items-center bg-gray-300 text-gray-800 rounded-full py-2 px-4 text-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <span className="mr-2 font-semibold">{ele}</span>
                  <span></span>
                  <AiOutlineClose 
                    onClick={() => deleteSkillOrCertificate('certificate', i)}
                    className="text-xs cursor-pointer hover:text-red-500"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicalSkills;
