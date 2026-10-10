import { FaHome } from "react-icons/fa";
import Button from "../../components/common/Button/Button";
import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col">
      <p>Error 404 Not Found!</p>
      <Button>
        <NavLink to="/" className="flex items-center gap-2">
          Back to Home <FaHome></FaHome>
        </NavLink>
      </Button>
    </div>
  );
}

export default NotFound;
