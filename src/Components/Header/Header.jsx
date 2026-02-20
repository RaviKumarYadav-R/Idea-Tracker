import React from "react";
import { Container, Button } from "../index";
import appWriteAuth from "../../lib/AppWrite/auth.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js";

function Header() {
  const userLoginStatus = useSelector((state) => state.auth.userLoginStatus);
  const dispatch = useDispatch();

  const handleLogout = () => {
    appWriteAuth.logoutUser().then(() => {
      dispatch(logout());
    });
  };

  const headerSlug = [
    {
      name: "Home",
      slug: "/",
      isActive: userLoginStatus,
    },
    {
      name: "My Ideas",
      slug: "/myideas",
      isActive: userLoginStatus,
    },
    {
      name: "Login",
      slug: "account/login",
      isActive: !userLoginStatus,
    },
  ];

  return (
    <header className="fixed w-full bg-slate-100/10 backdrop-blur-xl">
      <Container className="flex justify-between items-center py-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Idea Tracker</h1>
        <nav>
          <ul className="flex gap-2 items-center">
            {headerSlug.map(
              (item) =>
                item.isActive && (
                  <li key={item.name}>
                    <Link
                      to={item.slug}
                      className="border-2 border-blue-900 bg-[#090920] text-white px-4 py-2 rounded-4xl text-xs"
                    >
                      {item.name}
                    </Link>
                  </li>
                ),
            )}

            {userLoginStatus && (
              <li>
                <Button
                  className="cursor-pointer bg-red-600 hover:bg-red-700"
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640 "
                    fill="currentcolor"
                    className="h-4 w-4"
                  >
                    <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" />
                  </svg>
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
