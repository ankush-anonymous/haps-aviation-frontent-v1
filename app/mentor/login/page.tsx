"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const MentorLoginPage = dynamic(() => import("@/components/mentor/login-page"), {
  ssr: false,
});

export default function MentorLoginPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MentorLoginPage />
    </Suspense>
  );
}
