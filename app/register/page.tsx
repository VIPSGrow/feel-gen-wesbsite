import RegisterPage from "@/componants/auth/RegisterPage";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterPage />
      </Suspense>
    </>
  );
};

export default page;
