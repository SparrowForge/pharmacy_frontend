import LeftComponent from "@/src/components/auth/LeftComponent";
import VerifyEmail from "@/src/components/auth/VerifyEmail";
import { Suspense } from "react";

const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen flex">
      <LeftComponent />
      <Suspense fallback={<div>Loading verification...</div>}>
        <VerifyEmail />
      </Suspense>
    </div>
  );
};

export default VerifyEmailPage;
