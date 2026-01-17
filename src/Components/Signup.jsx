import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import appWriteAuth from "../lib/AppWrite/auth.js";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index.js";

function Signup() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");

  async function onSubmit(data) {
    setError("");
    try {
      const user = await appWriteAuth.createNewAccount(data);
      if (user) {
        const userdata = await appWriteAuth.getCurrentUser();
        if (userdata) dispatch(login(userdata));
        navigate("/");
        reset();
      }
    } catch (error) {
      setError(error.message || "Signup failed");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-slate-900 text-white p-6 mt-10 rounded-lg border border-slate-700 shadow">
      <h2 className="text-center font-semibold text-3xl mb-4 pb-4 border-b border-slate-700">
        Signup
      </h2>
      <div className="border-b border-slate-700 pb-4 mb-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          <Button className="border-b border-slate-700 pb-4 mb-4" type="submit">
            Signup
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <p className="text-center">
        Already have an account?{" "}
        <Link className="text-blue-400" to="/account/login">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
