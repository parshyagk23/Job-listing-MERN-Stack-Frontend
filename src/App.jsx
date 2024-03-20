import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Main from "./Pages/Main";
import AddJob from "./Pages/AddJob";
import ViewJobDetails from "./Pages/ViewJobDetails";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<Main />} />
        <Route path="addjob" element={<AddJob />} />
        <Route path="viewjobs" element={<ViewJobDetails />} />
      </Routes>
    </>
  );
}

export default App;
