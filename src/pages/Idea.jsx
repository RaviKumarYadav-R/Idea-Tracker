import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import appWriteDatabase from "../lib/AppWrite/database.js";
import { Button } from "../Components";
import { useNavigate } from "react-router-dom";
import { removeIdea } from "../store/ideasSlice.js";

function Idea() {
  const { id } = useParams();

  const ideaList = useSelector((state) => state.ideas.ideas);
  const userDetails = useSelector((state) => state.auth.userDetails);

  const idea = ideaList.find((idea) => idea.$id === id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = idea
      ? `${idea.title} - Idea Tracker`
      : "Idea not found - Idea Tracker";
  }, []);

  if (!idea) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        Idea not found
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg">
      <div className="flex justify-between items-start gap-4 mb-2">
        <h2 className="font-bold text-2xl">{idea?.title}</h2>
        {idea?.userId === userDetails?.$id && (
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
            onClick={() => {
              appWriteDatabase.removeDocument(idea.$id);
              dispatch(removeIdea(idea.$id));
              navigate("/myideas", { replace: true });
            }}
          >
            Delete
          </Button>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Created At : {new Date(idea?.$createdAt).toLocaleString()}
        </p>
        <p className="mb-2 flex items-center justify-end gap-1">
          Author : {idea?.userName}{" "}
        </p>
      </div>
      <p className="text-gray-700">{idea?.description}</p>
    </div>
  );
}

export default Idea;
