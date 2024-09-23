import React from "react";
import { useSelector } from "react-redux";
import { FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaMapPin, FaUniversity, FaCalendarAlt, FaBriefcase, FaCertificate, FaFileAlt, FaGraduationCap } from 'react-icons/fa';

const ReviewAndSubmit = () => {
  const formDetails = useSelector((state) => state.form.formData);

  return (
    <div className="mt-20 mx-5 lg:mx-20 container bg-slate-100 w-auto p-6 rounded-lg shadow-md">
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-950 mb-4 flex items-center">
          <FaUser className="text-blue-500 mr-2" /> Personal Information
        </h3>
        <div className="space-y-2">
          {formDetails && formDetails.step1 && (
            <>
              <p className="text-gray-700"><span className="font-bold">Full Name:</span> {formDetails.step1?.Name}</p>
              <p className="text-gray-700"><FaPhoneAlt className="inline mr-1" /> <span className="font-bold">Mobile Number:</span> {formDetails.step1?.phone}</p>
              <p className="text-gray-700"><FaEnvelope className="inline mr-1" /> <span className="font-bold">Email ID:</span> {formDetails.step1?.email}</p>
              <p className="text-gray-700"><FaMapMarkerAlt className="inline mr-1" /> <span className="font-bold">Address:</span> {formDetails.step1?.address}</p>
              <p className="text-gray-700"><FaMapPin className="inline mr-1" /> <span className="font-bold">Pincode:</span> {formDetails.step1?.pinCode}</p>
              <p className="text-gray-700"><FaMapMarkerAlt className="inline mr-1" /> <span className="font-bold">City:</span> {formDetails.step1?.city}</p>
            </>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-950 mb-4 flex items-center">
          <FaUniversity className="text-blue-500 mr-2" /> Educational Details
        </h3>
        <div className="space-y-4">
          {formDetails && formDetails.step2 && formDetails.step2.length > 0 &&
            formDetails.step2.map((ele) => (
              <div key={ele.id} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700"><span className="font-semibold">Education:</span> {ele?.level}</p>
                <p className="text-gray-700"><FaUniversity className="inline mr-1" /> <span className="font-semibold">University:</span> {ele?.university}</p>
                <p className="text-gray-700"><FaGraduationCap className="inline mr-1" /><span className="font-semibold">Grades:</span> {ele?.percentage}</p>
                <p className="text-gray-700"><FaCalendarAlt className="inline mr-1" /> <span className="font-semibold">Year Of Completion:</span> {ele?.yearOfPassing?.split("-").reverse().join("/")}
                </p>
              </div>
            ))}
        </div>
      </section>

      {formDetails && formDetails.step3 && formDetails.step3.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-950 mb-4 flex items-center">
            <FaBriefcase className="text-blue-500 mr-2" /> Experience
          </h3>
          <div className="space-y-4">
            {formDetails.step3.map((ele) => (
              <div key={ele.id} className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700"><span className="font-semibold">Company:</span> {ele?.companyName}</p>
                <p className="text-gray-700"><span className="font-semibold">Job Title:</span> {ele?.jobTitle}</p>
                <p className="text-gray-700"><span className="font-semibold">Duration (In Months):</span> {ele?.duration}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {formDetails && formDetails.step4 && formDetails.step4.tech.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-950 mb-4 flex items-center">
            <FaBriefcase className="text-blue-500 mr-2" /> Technical Skills
          </h3>
          <div className="space-y-2">
            <ul className="list-disc pl-5 text-gray-700">
              {formDetails.step4.tech.map((ele, id) => (
                <li key={id} className="font-semibold text-indigo-900">{ele}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {formDetails && formDetails.step4 && formDetails.step4.certificate.length > 0 && (
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-950 mb-4 flex items-center">
            <FaCertificate className="text-blue-500 mr-2" /> Certifications
          </h3>
          <div className="space-y-2">
            <ul className="list-disc pl-5 text-gray-700">
              {formDetails.step4.certificate.map((ele, id) => (
                <li key={id} className="font-semibold text-indigo-900">{ele}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
      
      <section>
        <h3 className="text-xl font-semibold text-gray-950 mb-4 flex items-center">
          <FaFileAlt className="text-blue-500 mr-2" /> Attachments
        </h3>
        <div className="space-y-2">
          {formDetails && formDetails.step5 && formDetails.step5.resume && (
            <p className="font-semibold text-indigo-900">{formDetails.step5.resume.name}</p>
          )}
          {formDetails && formDetails.step5 && formDetails.step5.coverLetter && (
            <p className="font-semibold text-indigo-900">{formDetails.step5.coverLetter.name}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ReviewAndSubmit;
