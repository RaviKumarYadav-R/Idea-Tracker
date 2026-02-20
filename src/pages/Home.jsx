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
      <Container className="pt-16">
        {!userLoginStatus && (
          <p className="text-center mb-4 font-semibold">
            Login To add own Ideas
          </p>
        )}

        {ideaslist.length > 0 ? (
          <div className="bg-white p-4 rounded-lg shadow-md max-w-[1000] w-full mx-auto">
            <h2 className="text-2xl font-bold mb-4">Letest Ideas</h2>
            <div className="space-y-2">
              {ideaslist.map((idea) => (
                <Link
                  to={`idea/${idea.$id}`}
                  key={idea.$id}
                  className="bg-slate-200 p-4 rounded-lg text-black block hover:bg-slate-300"
                >
                  <h3 className="text-base font-semibold mb-1">{idea.title}</h3>
                  <p className="text-gray-700 text-xs">
                    {idea.description.split(" ").slice(0, 50).join(" ")}
                    {idea.description.split(" ").length > 50 && "..."}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[12px] text-gray-500">
                      {new Date(idea?.$createdAt).toLocaleString()}
                    </p>
                    <p className="text-neutral-800 font-semibold text-xs">
                      Author : {idea?.userName}{" "}
                    </p>
                  </div>
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
