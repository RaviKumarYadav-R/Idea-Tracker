import React, {  useEffect } from "react";
import { Signup } from "../Components";

function SignupComp() {
  useEffect(() => {
    document.title = "Signup - Idea Tracker";
  }, []);
  return <div className="pt-30">
    <Signup />
  </div>;
}

export default SignupComp;
