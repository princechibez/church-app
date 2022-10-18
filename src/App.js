import React, { useState } from "react";
import Navbar from "./components/navbar/navbar";
import Homepage from "./pages/Homepage/homepage";
import Signup from "./pages/auth/signup/signup";
import Login from "./pages/auth/login/login";
import PasswordReset from "./pages/auth/passwordReset/passwordReset";

import { Route, Routes } from "react-router-dom";
import StagedForm from "./components/StagedForm/StagedForm";
import ResetInstructions from "./pages/auth/passwordReset/resetInstructions/resetInstructions";
import NewPassword from "./pages/auth/passwordReset/NewPassword/NewPassword";
import SuccessfullPassReset from "./pages/auth/passwordReset/successfullPassReset";
import Members from "./pages/members/members";
import MemberDetails from "./pages/members/member-details/member-details";

const App = () => {
  const [member, setMember] = useState({});
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setMember={setMember} />} />
        <Route path="/forgot-password" element={<PasswordReset />} />
        <Route path="/staged-form" element={<StagedForm />} />
        <Route
          path="/password-reset-instruction"
          element={<ResetInstructions />}
        />
        <Route path="/set-new-password" element={<NewPassword />} />
        <Route path="/reset-successfull" element={<SuccessfullPassReset />} />
        <Route path="/members" element={<Members member={member} />} />
        <Route path="/member-details" element={<MemberDetails />} />
      </Routes>
    </>
  );
};

export default App;
