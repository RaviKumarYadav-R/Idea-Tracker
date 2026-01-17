import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoginComp,
  SignupComp,
  Home,
  MyIdeas,
  Idea,
  CreateIdea,
} from "./pages/index.js";

import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "account/login",
        element: (
          <ProtectedRoutes>
            <LoginComp />
          </ProtectedRoutes>
        ),
      },
      {
        path: "account/signup",
        element: (
          <ProtectedRoutes>
            <SignupComp />
          </ProtectedRoutes>
        ),
      },
      {
        path: "myideas",
        element: <MyIdeas />,
      },
      {
        path: "idea/:id",
        element: <Idea />,
      },
      {
        path: "myideas/idea/:id",
        element: <Idea />,
      },
      {
        path: "myideas/createidea",
        element: <CreateIdea />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
