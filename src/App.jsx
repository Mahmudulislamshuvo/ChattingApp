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
import ExtraDesign from "./Components/CommonCompo/ExtraDesign.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import NotificationPage from "./Pages/NotificationPage.jsx";
import SettingsPage from "./Pages/SettingsPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />}>
        <Route path="ChatPage" element={<ChatPage />} />
        <Route path="NotificationPage" element={<NotificationPage />} />
        <Route path="SettingsPage" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<h3> Error Page </h3>} />
      <Route path="email-verified" element={<VerifyEmail />} />
      <Route path="ExtraDesign" element={<ExtraDesign />} />
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
