import Button from "../../common/Button/Button";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import SideBar from "../SideBar/SideBar";
import { NavLink } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../../Redux/slices/authSlice";
import { ThemeContext } from "../../../Context/ThemeContext";
import { CiDark, CiLight } from "react-icons/ci";

function Navbar({ searchQuery, setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authR);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const links = ["Home", "Posts", "Events", "About"];

  const toggleOpenMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <nav className="bg-surface text-on-surface border-b border-outline-variant sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-16 flex  items-center justify-evenly px-4">
        <div className="flex items-center w-full justify-evenly">
          <div className="flex items-center">
            <div className="mr-4">
              <button
                className="lg:hidden ml-auto relative p-2 hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
                onClick={toggleOpenMenu}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="text-2xl text-on-surface" />
                ) : (
                  <FaBars className="text-2xl text-on-surface" />
                )}
              </button>
            </div>
            <a
              className="text-primary font-bold text-2xl hover:opacity-90"
              href="#"
            >
              TechNexus
            </a>
          </div>
          <input
            className="px-4 bg-surface text-on-surface border-2 border-outline-variant rounded-full text-sm h-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul className="gap-10 justify-between hidden lg:flex">
            {links.map((link) => (
              <li key={link}>
                <NavLink
                  className="text-on-surface-variant hover:text-primary transition-colors"
                  to={link.toLowerCase()}
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={toggleTheme}
          className="p-3 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 bg-surface-container text-on-surface mr-3"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <CiDark className="text-2xl" />
          ) : (
            <CiLight className="text-2xl" />
          )}
        </button>

        {!isAuthenticated ? (
          <div className="hidden lg:flex gap-6 items-center min-w-fit">
            <NavLink
              className="text-on-surface-variant hover:text-primary transition-colors"
              to="login"
            >
              Login
            </NavLink>
            <NavLink to="register">
              <Button>Join Now</Button>
            </NavLink>
          </div>
        ) : (
          <Button
            onClick={() => dispatch(logoutAction())}
            moreStyle={"hidden lg:block"}
          >
            <p className="flex items-center gap-2">
              Logout <CgLogOut />
            </p>
          </Button>
        )}
      </div>
      {isOpen && <SideBar links={links}></SideBar>}
    </nav>
  );
}

export default Navbar;
