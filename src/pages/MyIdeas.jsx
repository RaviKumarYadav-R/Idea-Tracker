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
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hello {userDetails?.name}</h2>
        <Button onClick={() => navigate("createidea")}>Add Idea</Button>
      </div>

      <div className="mt-6 space-y-4">
        {myIdeas.length > 0 ? (
          myIdeas.map((idea) => (
            <Link
              to={`idea/${idea.$id}`}
              key={idea.$id}
              className="bg-slate-300 p-4 rounded-lg text-black shadow   block hover:bg-slate-400 transition-colors "
            >
              <div className="flex justify-between items-center gap-4 mb-4">
                <h3 className="text-xl font-semibold">{idea.title}</h3>
              </div>
              <p className="text-gray-600">{idea.description}</p>
            </Link>
          ))
        ) : (
          <p>Add your first idea.</p>
        )}
      </div>
    </div>
  );
}

export default MyIdeas;
