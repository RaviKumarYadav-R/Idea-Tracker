import React, { useEffect } from "react";
import { Container } from "../Components/index";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const userLoginStatus = useSelector((state) => state.auth.userLoginStatus);
  const ideaslist = useSelector((state) => state.ideas.ideas);
  useEffect(() => {
    document.title = "Home - Idea Tracker";
  }, []);

  return (
    <div>
      <Container>
        {!userLoginStatus && <p className="text-center mb-4 font-semibold">Login To add own Ideas</p>}

        {ideaslist.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Letest Ideas</h2>
            <div className="space-y-4 ">
              {ideaslist.map((idea) => (
                <Link
                  to={`idea/${idea.$id}`}
                  key={idea.$id}
                  className="bg-slate-200 p-4 rounded-lg text-black block hover:bg-slate-300"
                >
                  <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
                  <p className="text-gray-600">
                    {idea.description.split(" ").slice(0, 30).join(" ")}
                    {idea.description.split(" ").length > 30 && "..."}
                  </p>
                  <p className="text-right">Author : {idea.userName}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <h3>No ideas available, Add your first idea.</h3>
        )}
      </Container>
    </div>
  );
}

export default Home;
