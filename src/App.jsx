import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import MainContainer from "./components/MainContainer";
import PersonalInfo from "./components/PersonalInfo";
import EducationalDetails from "./components/EducationalDetails";
import WorkExperience from "./components/WorkExperience";
import TechnicalSkills from "./components/TechnicalSkills";
import AdditionalInfo from "./components/AdditionalInfo";
import ReviewAndSubmit from "./components/ReviewAndSubmit";
import PageNotFound from "./components/PageNotFound";
import store from "./reduxData/store";
import SuccessPage from "./components/SuccessPage";
import WelcomePage from "./components/WelcomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />, 
    },
    {
      path: "/success",
      element: <SuccessPage />,
    },
    {
      path: "/",
      element: <MainContainer />,
      children: [
        {
          path: "step1",
          element: <PersonalInfo />,
        },
        {
          path: "step2",
          element: <EducationalDetails />,
        },
        {
          path: "step3",
          element: <WorkExperience />,
        },
        {
          path: "step4",
          element: <TechnicalSkills />,
        },
        {
          path: "step5",
          element: <AdditionalInfo />,
        },
        {
          path: "step6",
          element: <ReviewAndSubmit />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
