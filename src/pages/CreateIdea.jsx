import React, { useEffect } from "react";
import { AddIdea, Container } from "../Components";

function CreateIdea() {
  useEffect(() => {
    document.title = "Create Idea - Idea Tracker";
  }, []);

  return (
    <div className="pt-30">
      <AddIdea />
    </div>
  );
}

export default CreateIdea;
