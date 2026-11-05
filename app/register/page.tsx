import RegisterPage from "@/componants/auth/RegisterPage";
import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Feel Safe account to shop hygiene and personal care products.",
  robots: {
    index: false,
    follow: true,
  },
};

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
