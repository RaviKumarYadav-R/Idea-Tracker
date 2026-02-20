import React, { useEffect } from "react";
import { Container, Login } from "../Components";

function LoginComp() {
  useEffect(() => {
    document.title = "Login - Idea Tracker";
  }, []);

  return (
    <div className="fixed inset-0 z-10 bg-slate-900 flex items-center justify-center">
      <Login />
    </div>
  );
}

export default LoginComp;
