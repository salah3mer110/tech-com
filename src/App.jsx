import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import LoginRegister from "./pages/LoginRegiser/LoginRegister";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout/ProtectedLayout";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store";
import { ThemeContext } from "./Context/ThemeContext";

const MainLayout = lazy(() => import("./layouts/MainLayout/MainLayout"));
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Posts = lazy(() => import("./pages/Posts/Posts"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const PostDetails = lazy(() => import("./pages/PostDetails/PostDetails"));

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    return savedTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const router = createBrowserRouter([
    {
      element: (
        <MainLayout
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        ></MainLayout>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="home" replace />,
        },
        {
          path: "home",
          element: <Home searchQuery={searchQuery}></Home>,
        },
        {
          path: "about",
          element: <About></About>,
        },
      ],
    },
    {
      element: <AuthLayout></AuthLayout>,
      children: [
        {
          path: "login",
          element: <LoginRegister />,
        },

        {
          path: "register",
          element: <LoginRegister />,
        },
      ],
    },
    {
      element: (
        <ProtectedLayout
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        ></ProtectedLayout>
      ),
      children: [
        {
          path: "posts",
          element: <Posts searchQuery={searchQuery}></Posts>,
        },
        {
          path: "posts/:id",
          element: <PostDetails />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound></NotFound>,
    },
  ]);

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;
