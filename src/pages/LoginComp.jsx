import React, { useEffect } from "react";
import { Container, Login } from "../Components";

function LoginComp() {
 useEffect(() => {
    document.title = "Login - Idea Tracker";
  }, []);

  return (
    <div className="pt-40">
      <Login />
    </div>
  );
}

export default LoginComp;
