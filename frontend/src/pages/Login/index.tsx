import React from "react";
import { LoginForm } from "../../features/authentication";

export const LoginPage: React.FC = () => {
  return (
    <div className="page-container flex-child-container-center">
      <LoginForm />
    </div>
  );
};
