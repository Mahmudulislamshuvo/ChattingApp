import LoginPage from "./Pages/LoginPage.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import HomePage from "./Components/Home/Home.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import VerifyEmail from "./Components/HomeComponents/VerifyEmail.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="home" element={<HomePage />} />
      <Route path="/" element={<h3> Error Page </h3>} />
      <Route path="email-verified" element={<VerifyEmail />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
