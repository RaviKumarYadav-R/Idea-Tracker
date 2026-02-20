import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Conform } from "../Components";
import { removeIdea } from "../store/ideasSlice.js";

function Idea() {
  const { id } = useParams();
  const [popUpOpen, setPopUpOpen] = useState(false);

  const ideaList = useSelector((state) => state.ideas.ideas);
  const userDetails = useSelector((state) => state.auth.userDetails);

  const idea = ideaList.find((idea) => idea.$id === id);

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
    <div className="max-w-4xl mx-auto p-6 pt-16 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          Created At : {new Date(idea?.$createdAt).toLocaleString()}
        </p>
        <p className="mb-2 flex items-center justify-end gap-1">
          Author : {idea?.userName}{" "}
        </p>
      </div>
      <div className="flex justify-between items-start gap-4 mb-2">
        <h2 className="font-bold text-2xl">{idea?.title}</h2>
        {idea?.userId === userDetails?.$id && (
          <Button
            className=" bg-transparent h-8 w-12 rounded-4xl cursor-pointer text-xs border border-red-600 flex items-center justify-center"
            onClick={() => setPopUpOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width="20"
              height="20"
              fill="#f00"
            >
              <path d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z" />
            </svg>
          </Button>
        )}
      </div>
      <p className="text-gray-700">{idea?.description}</p>

      {popUpOpen && (
        <Conform
          title={idea?.title}
          id={idea?.$id}
          setPopUpOpen={setPopUpOpen}
        />
      )}
    </div>
  );
}

export default Idea;
