import Footer from "../../components/layout/Footer/Footer";
import Navbar from "../../components/layout/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout({ searchQuery, setSearchQuery }) {
  // const { isAuthenticated } = useContext(AuthContext);

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

export default MainLayout;
