import React from "react";
import { SignUpForm } from "../../features/authentication";

export const SignUpPage: React.FC = () => {
  return (
    <div className="page-container flex-child-container-center">
      <SignUpForm />
    </div>
  );
};
