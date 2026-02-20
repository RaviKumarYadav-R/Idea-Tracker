import React, { useEffect } from "react";
import { Signup } from "../Components";

function SignupComp() {
  useEffect(() => {
    document.title = "Signup - Idea Tracker";
  }, []);
  return (
    <div className="fixed inset-0 z-10 bg-slate-900 flex items-center justify-center">
      <Signup />
    </div>
  );
}

export default SignupComp;
