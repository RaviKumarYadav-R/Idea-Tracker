import { useEffect, useRef, useState } from "react";
import appWriteAuth from "./lib/AppWrite/auth.js";
import appWriteDatabase from "./lib/AppWrite/database.js";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { login, logout } from "./store/authSlice.js";
import { Container, Header } from "./Components/index.js";
import { addIdea } from "./store/ideasSlice.js";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isrenderd = useRef(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (isrenderd.current) return;
    isrenderd.current = true;
    appWriteAuth
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });

    appWriteDatabase
      .getAllDocuments()
      .then((ideas) => {
        ideas.total > 0 &&
          ideas.rows.forEach((idea) => {
            dispatch(addIdea(idea));
          });
      })
      .catch((error) => {
        console.error("Error fetching ideas:", error);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <Container className="py-8">
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
