import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";

function ProtectedLayout({ searchQuery, setSearchQuery }) {
  const { isAuthenticated } = useSelector((state) => state.authR);

  if (!isAuthenticated) return <Navigate to="login" replace />;

  return (
    <>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      ></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default ProtectedLayout;
