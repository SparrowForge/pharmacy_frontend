import ChangePassword from "@/src/components/auth/ChangePassword";
import ForgotPassword from "@/src/components/auth/ForgotPassword";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";
import React from "react";

const ChangePasswordPage = () => {
  return (
    <ProtectedRoute>
      {/* <ChangePassword/> */}
      <div></div>
    </ProtectedRoute>
  );
};

export default ChangePasswordPage;
