import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import JobPostPage from "./Pages/JobPostPage/JobPostPage";
import JobDetailsPage from "./Pages/JobDetailsPage/JobDetailsPage";
import HomePage from "./Pages/HomePage/HomePage";
import ProtectedRoute from "./Components/ProtectedRoute";
function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/job-post" 
               element={<ProtectedRoute Component={JobPostPage} />}
        />
        <Route path="/job-details/:id" element={<JobDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
