import { useRouteError } from "react-router-dom";
import notFoundImg from '../assets/Not_Found.jpg'

const PageNotFound = () => {
  const error = useRouteError();
  console.error(error, "Error wrong url");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <img
          src={notFoundImg}
          alt="Not Found"
          className="mx-auto mb-4 w-40 h-40 object-cover"
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          OOPS PAGE NOT FOUND!
        </h2>
      </div>
    </div>
  );
};

export default PageNotFound;
