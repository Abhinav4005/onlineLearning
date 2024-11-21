import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import Forgot from "./pages/Forgot/Forgot.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/Reset/ResetPassword.js";
import Signup from "./pages/Signup/Signup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <Signup/> */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
