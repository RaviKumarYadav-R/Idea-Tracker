import { useSelector } from "react-redux";
import { Button } from "../Components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function MyIdeas() {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const ideaList = useSelector((state) => state.ideas.ideas);
  const myIdeas = ideaList.filter((idea) => idea.userId === userDetails?.$id);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "My Ideas - Idea Tracker";
    if (!userDetails) {
      navigate("/account/login", { replace: true });
    }
  }, [userDetails, navigate]);

  return (
    <div className="pt-12">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hello {userDetails?.name}</h2>
        <Button
          onClick={() => navigate("createidea")}
          className="flex items-center gap-1 bg-[#634bff] cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="size-4"
            fill="currentColor"
          >
            <path d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z" />
          </svg>{" "}
          <span>Create Idea</span>
        </Button>
      </div>

      <div className="mt-6 space-y-4">
        {myIdeas.length > 0 ? (
          myIdeas.map((idea) => (
            <Link
              to={`idea/${idea.$id}`}
              key={idea.$id}
              className="bg-slate-300 p-4 rounded-lg text-black shadow block hover:bg-slate-400 transition-colors "
            >
              <h3 className="text-base font-semibold mb-1">{idea.title}</h3>
              <p className="text-gray-700 text-base">
                {idea.description.split(" ").slice(0, 30).join(" ")}
                {idea.description.split(" ").length > 30 && "..."}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-center">Add your first idea.</p>
        )}
      </div>
    </div>
  );
}

export default MyIdeas;
