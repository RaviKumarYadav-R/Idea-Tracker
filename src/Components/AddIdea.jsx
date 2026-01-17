import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Textarea } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addIdea } from "../store/ideasSlice";
import appWriteDatabase from "../lib/AppWrite/database";

function AddIdea() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.userDetails);

  async function onSubmit(data) {
    try {
      const document = await appWriteDatabase.createDocument({
        ...data,
        userId: userDetails?.$id,
        userName: userDetails?.name,
      });
      dispatch(addIdea(document));
    } catch (error) {
      console.log("Error in adding idea", error);
    }

    // empty the form fields
    reset();
    navigate("/myideas", { replace: true });
  }
  return (
    <div
      className="max-w-xl w-full mx-auto bg-slate-900 p-4 rounded-lg shadow shadow-slate-600 text-white
    "
    >
      <h2 className="text-2xl text-center mb-3 pb-2 border-b border-slate-400">
        Add Idea
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <Input
            label="Title"
            placeholder="Idea Title"
            {...register("title", { required: true })}
          />

          <Textarea
            label="Description"
            placeholder="Idea Description"
            className="w-full h-32 mb-4 px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-blue-500"
            {...register("description", { required: true })}
          />

          <Button className="cursor-pointer" type="submit">
            Add Idea
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddIdea;
