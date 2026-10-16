import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import img from "../../assets/images/robot.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  login as loginUser,
  register as registerUser,
} from "../../Redux/slices/authSlice";

function LoginRegister() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, error } = useSelector(
    (state) => state.authR,
  );

  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSignIn = () => {
    console.log("Google sign-in clicked");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLoginPage) {
        const resultAction = await dispatch(
          loginUser({
            email: formData.email,
            password: formData.password,
          }),
        );

        console.log(resultAction);
        if (loginUser.fulfilled.match(resultAction)) {
          navigate("/home");
        }
      } else {
        if (formData.password !== confirmPassword) {
          return;
        }

        const resultAction = await dispatch(
          registerUser({ ...formData, id: uuid() }),
        );

        if (registerUser.fulfilled.match(resultAction)) {
          navigate("/home");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMode = () => {
    if (isLoginPage) {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`min-h-screen w-full bg-surface-low/80 text-on-surface transition-colors duration-300 ${!isLoginPage && "pt-5"}`}
    >
      <div className={`${isLoginPage ? "pt-16" : "pt-6 pb-14"}`}>
        <div className="flex bg-surface border border-outline-variant rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl transition-colors duration-300">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img})`,
            }}
            role="img"
            aria-label="Decorative background image"
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-on-surface text-center">
              TechCom
            </h2>
            <p className="text-xl text-on-surface-variant text-center">
              {isLoginPage ? "Welcome back!" : "Create your account"}
            </p>

            {error && (
              <div className="mt-4 p-3 bg-error/10 border border-error/30 text-error rounded text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center mt-4 w-full bg-surface hover:bg-surface-container text-on-surface rounded-lg shadow-md transition-colors border border-outline-variant cursor-pointer"
            >
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <h1 className="px-4 py-3 w-5/6 text-center text-on-surface font-bold">
                {isLoginPage ? "Sign in with Google" : "Sign up with Google"}
              </h1>
            </button>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b border-outline-variant w-1/5 lg:w-1/4"></span>
              <span className="text-xs text-center text-on-surface-variant/80 uppercase">
                {isLoginPage ? "or login with email" : "or sign up with email"}
              </span>
              <span className="border-b border-outline-variant w-1/5 lg:w-1/4"></span>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLoginPage && (
                <div className="mt-4">
                  <label
                    htmlFor="name"
                    className="block text-on-surface-variant text-sm font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant rounded py-2 px-4 block w-full appearance-none transition-all"
                    required
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-on-surface-variant text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant rounded py-2 px-4 block w-full appearance-none transition-all"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-on-surface-variant text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  {isLoginPage && (
                    <a
                      href="#"
                      className="text-xs text-on-surface-variant hover:text-primary transition-colors"
                    >
                      Forget Password?
                    </a>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant rounded py-2 px-4 block w-full appearance-none transition-all"
                  required
                  placeholder="Enter your password"
                  minLength={6}
                />
              </div>

              {!isLoginPage && (
                <div className="mt-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-on-surface-variant text-sm font-bold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-surface-container text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant rounded py-2 px-4 block w-full appearance-none transition-all"
                    required
                    placeholder="Confirm your password"
                    minLength={6}
                  />
                </div>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-primary text-on-primary font-bold py-2 px-4 w-full rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {isLoading
                    ? isLoginPage
                      ? "Logging in..."
                      : "Registering..."
                    : isLoginPage
                      ? "Login"
                      : "Register"}
                </button>
              </div>
            </form>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b border-outline-variant w-1/5 md:w-1/4"></span>
              <button
                onClick={toggleMode}
                className="text-xs text-on-surface-variant uppercase hover:text-primary transition-colors cursor-pointer"
              >
                {isLoginPage ? "or sign up" : "already have account"}
              </button>
              <span className="border-b border-outline-variant w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
