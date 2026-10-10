import { Link } from "react-router-dom";
import Button from "../../common/Button/Button";
import { CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../../Redux/slices/authSlice";

function SideBar({ links }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.authR);

  return (
    <aside
      id="default-sidebar"
      className="absolute bg-surface block lg:hidden pl-3 border-2 border-outline-variant top-16 left-0 z-40 w-64 transition-transform sm:translate-x-0 max-h-screen"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-surface-low border-e border-outline-variant">
        <ul className="space-y-2 font-medium">
          {links.map((link) => (
            <li key={link} className="my-7">
              <Link className="text-on-surface-variant hover:text-primary transition-colors" to={link.toLowerCase()}>
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {!isAuthenticated ? (
          <div className="hidden lg:flex gap-6 items-center min-w-fit">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
              Login
            </a>
            <Button>Join Now</Button>
          </div>
        ) : (
          <Button onClick={() => dispatch(logoutAction())}>
            <p className="flex items-center gap-2">
              Logout <CgLogOut />
            </p>
          </Button>
        )}
      </div>
    </aside>
  );
}

export default SideBar;
