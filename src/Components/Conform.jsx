import React from "react";
import Button from "./Button";
import appWriteDatabase from "../lib/AppWrite/database";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeIdea } from "../store/ideasSlice";

function Conform({ title, id, setPopUpOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2 text-center bg-neutral-100 p-4 rounded-4xl max-w-125">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="size-6 mb-2 fill-red-500 mx-auto"
      >
        <path d="M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z" />
      </svg>

      <h3 className="font-bold text-2xl">Delete Idea</h3>
      <p className="leading-6 my-3">
        You're going to delete{" "}
        <span className="font-semibold text-red-500">{title}</span>
      </p>

      <div className="flex items-center justify-center gap-4 mt-3">
        <Button
          className="bg-neutral-400 cursor-pointer"
          onClick={() => setPopUpOpen(false)}
        >
          No, Keep it!
        </Button>
        <Button
          className="bg-red-600 cursor-pointer"
          onClick={() => {
            appWriteDatabase.removeDocument(id);
            dispatch(removeIdea(id));
            navigate("/myideas", { replace: true });
          }}
        >
          Yes, Delete!
        </Button>
      </div>
    </div>
  );
}

export default Conform;
