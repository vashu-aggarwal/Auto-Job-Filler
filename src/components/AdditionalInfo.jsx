import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm } from "../reduxData/formActions";
import useDebounce from "../helperUtils/useDebounce";
import logo from "../assets/file_upload.png";

const AdditionalInfo = () => {
  const [selectedFile, setSelectedFile] = useState({
    resume: "",
    coverLetter: "",
  });
  const resumeInputRef = useRef(null);
  const coverLetterInputRef = useRef(null);
  const dispatch = useDispatch();
  const additionalInfoData = useSelector((state) => state.form.formData?.step5);

  useEffect(() => {
    if (additionalInfoData) {
      setSelectedFile(additionalInfoData);
    }
  }, [additionalInfoData]);

  const debouncedUpdateFormData = useDebounce((data) => {
    dispatch(updateForm("step5", data));
  }, 500);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileType = e.target.name;
    let temp = { ...selectedFile };
    if (file) {
      temp[fileType] = file;
      setSelectedFile(temp);
      debouncedUpdateFormData(temp);
    }
  };

  const handleFileRemove = (type) => {
    let temp = { ...selectedFile };
    temp[type] = "";
    setSelectedFile(temp);
    // Used Ref to remove displayed file name from UI
    if (type === 'resume') {
      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    } else if (type === 'coverLetter') {
      if (coverLetterInputRef.current) {
        coverLetterInputRef.current.value = "";
      }
    }
    debouncedUpdateFormData(temp);
  };

  return (
    <div className="mt-20 mx-20 container border-dashed border-2 border-gray-300 w-auto p-5 rounded">
      <div className="grid grid-cols-2 gap-8 p-2 place-items-center">
        <div className="mx-2 w-[80%]">
          <div className="p-5 bg-gray-100 cursor-pointer rounded-2xl flex flex-col items-center justify-center text-center h-55 mt-5">
            <label
              htmlFor="resume-input"
              className="flex flex-col items-center"
            >
              <img
                src={logo}
                height="50"
                width="50"
                alt="upload-icon"
                className="mb-2"
              />
              <input
                id="resume-input"
                name="resume"
                type="file"
                onChange={handleFileChange}
                ref={resumeInputRef}
                className="hidden"
              />
              <p className="text-blue-600 pt-2">Click to upload Resume</p>
              <span className="text-gray-500 text-sm">
                Supported files: pdf, doc, docx
              </span>
            </label>
            {selectedFile.resume && (
              <div className="mt-2 text-center">
                <p className="text-gray-700">{selectedFile.resume.name}</p>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleFileRemove("resume")}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mx-2 w-[80%]">
          <div className="p-5 bg-gray-100 cursor-pointer rounded-2xl flex flex-col items-center justify-center text-center h-55 mt-5">
            <label
              htmlFor="coverLetter-input"
              className="flex flex-col items-center"
            >
              <img
                src={logo}
                height="50"
                width="50"
                alt="upload-icon"
                className="mb-2"
              />
              <input
                id="coverLetter-input"
                name="coverLetter"
                type="file"
                onChange={handleFileChange}
                ref={coverLetterInputRef}
                className="hidden"
              />
              <p className="text-blue-600 pt-2">Click to upload Cover Letter</p>
              <span className="text-gray-500 text-sm">
                Supported files: pdf, doc, docx
              </span>
            </label>
            {selectedFile.coverLetter && (
              <div className="mt-2 text-center">
                <p className="text-gray-700">{selectedFile.coverLetter.name}</p>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleFileRemove("coverLetter")}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
