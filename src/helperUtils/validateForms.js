import moment from "moment";

export const validatePersonalInfo = ({ userPersonalDetails = {} }) => {
  const { Name, phone, email, address, pinCode, city } = userPersonalDetails;

  const validateEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  if (!Name) {
    return "Please enter your full name";
  } else if (!phone) {
    return "Please enter mobile number";
  } else if (!email) {
    return "Please enter email id";
  } else if (!validateEmail(email)) {
    return "Invalid email address";
  } else if (!address) {
    return "Please enter address";
  } else if (!pinCode) {
    return "Please enter your pincode";
  } else if (!city) {
    return "Please enter your city name";
  }
};

const isValidYearDifference = (data) => {
  const sortedData = data.map((item) => ({
    ...item,
    yearOfPassing: moment(item.yearOfPassing),
  }));

  for (let i = 0; i < sortedData.length - 1; i++) {
    const currentDate = sortedData[i].yearOfPassing;
    const nextDate = sortedData[i + 1].yearOfPassing;

    const yearsDifference = nextDate.diff(currentDate, "years", true);

    if (yearsDifference < 2) {
      return false;
    }
  }
  return true;
};

export const validateEducationalDetails = ({ educationalInfo = [] }) => {
  if (educationalInfo?.length > 0) {
    const isValid = isValidYearDifference(educationalInfo);
    if (!isValid) {
      return "Gap between consecutive educational levels should be more than 2 years";
    }
    return educationalInfo.reduce((acc, ele) => {
      if (!ele.university) {
        return `Please enter university name for ${ele.level}`;
      } else if (!ele.percentage) {
        return `Please enter percentage for ${ele.level}`;
      } else if (!ele.yearOfPassing) {
        return `Please enter year of passing for ${ele.level}`;
      }
      return acc;
    }, "");
  } else {
    return "Please fill all the fields";
  }
};

export const validateWorkExperienceData = ({ workExperienceDetails = [] }) => {
  if (workExperienceDetails?.length > 0) {
    return workExperienceDetails.reduce((acc, ele) => {
      if (!ele.companyName) {
        return `Please enter company name for work experience ${ele.id}`;
      } else if (!ele.jobTitle) {
        return `Please enter designation for work experience ${ele.id}`;
      } else if (!ele.duration) {
        return `Please enter duration of work for work experience  ${ele.id}`;
      }
      return acc;
    }, "");
  } else {
    return "Please fill all the fields of work experience";
  }
};

export const validateTechSkills = ({ techData = {} }) => {
  if (techData?.tech?.length > 0) {
    return "";
  } else {
    return "Please enter at least one technical skill";
  }
};

export const validateDocuments = ({ documents = {} }) => {
  if (!documents?.resume?.name) {
    return "Resume is mandatory";
  }
};
