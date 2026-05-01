import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

import useFetchUserProfile from "../hooks/useFetchUserProfile";
import { getUserDetails } from "../utils/helper";
import { setUser, setIsLoggedIn } from "../store/User";
import userRequest from "../api/User/user.request";
import { SUCCESS } from "../constants";

import Cover from "../assets/images/cover.jpg";

export const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const state = useSelector((state) => state.user);

  useFetchUserProfile();

  useEffect(() => {
    if (state.isLoggedIn) {
      switch (String(state.user?.role)) {
        case "PROCUREMENTSTAFF":
          navigate("/request");
          break;
        case "SITEMANAGER":
          navigate("/order");
          break;
        case "SUPPLIER":
          navigate("/deliveryStatus");
          break;
        case "ADMIN":
          navigate("/users");
          break;
        default:
          navigate("/home");
      }
    }
  }, [state.isLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.login({
        email: e.target.email.value,
        password: e.target.password.value,
      });
      if (res?.status === SUCCESS && res?.data) {
        const user = await getUserDetails();
        if (user && user?._id) {
          dispatch(setUser(user));
          dispatch(setIsLoggedIn(true));
        } else {
          navigate("/");
        }
      } else
        toast.error("Invalid username or password.");
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full"
              src={Cover}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleLogin}>
              <h1 className="mb-4 text-xl text-center tracking-tight font-bold text-black">
                <span className="font-normal">Welcome to</span>
                <br />
                The Procurement Management Portal
              </h1>
              <hr className="opacity-10 mb-4" />
              <input
                className="mt-1 w-full border rounded py-2 px-3"
                type="email"
                id="email"
                name="email"
                required
                placeholder="Enter email"
              />
              <input
                className="mt-3 w-full border rounded py-2 px-3"
                type="password"
                id="password"
                name="password"
                required
                placeholder="Password"
              />

              <button className="mt-8 py-2 rounded text-white btn btn-active btn-primary w-full bg-black">
                Log in
              </button>

              <p className="mt-4 text-center text-sm">
                Don't have an account?
                {` `}
                <Link
                  className="text-sm font-medium text-purple-600 hover:underline"
                  to="/register">
                  Register
                </Link>
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};
