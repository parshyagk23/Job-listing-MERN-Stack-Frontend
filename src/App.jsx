import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import JobPostPage from "./Pages/JobPostPage/JobPostPage";
import JobDetailsPage from "./Pages/JobDetailsPage/JobDetailsPage";
import HomePage from "./Pages/HomePage/HomePage";
import ProtectedRoute from "./Components/ProtectedRoute";
import AppliedJobPage from "./Pages/AppliedJobPage/AppliedJobPage";
import PostedJobsPage from "./Pages/PostedJobsPage/PostedJobsPage";
import Cookies from "js-cookie";
function App() {
  const usertype=Cookies.get('usertype')
 
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {usertype==="Recruiter" && <Route path="/job-post" element={<ProtectedRoute Component={JobPostPage} />}/>}
        <Route path="/job-details/:id" element={<JobDetailsPage />} />
        {!usertype==="Recruiter" && <Route path="/applied-job/:userId" element={<ProtectedRoute Component={AppliedJobPage} />} />}
        {usertype==="Recruiter" && <Route path="/postedjobs/:refuserid" element={<ProtectedRoute Component={PostedJobsPage} />} />}
        <Route path="*" element={<h1 style={{margin:"0 auto", marginTop:'30px' }} className="w-2/5 text-center font-bold text-4xl xs:text-2xl xs:w-64 " >404 Page Not Found</h1>} />
      </Routes>
        
    </>
  );
}

export default App;
