import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RooteState } from "../store/Store";
import { userLogin } from "../store/userReducer/userApi";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userLoginStatus } = useSelector((state: RooteState) => state.user);
  const [userDetail, setUserDetail] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(userLogin(userDetail));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-48px)] bg-orange-100 px-2 md:px-44 flex justify-center pt-16">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full md:w-[60%] flex flex-col gap-8"
      >
        <h2 className="underline text-lg md:text-4xl text-center">Login</h2>
        <div className="flex flex-col gap-2 text-sm md:text-xl">
          <label htmlFor="email">Email</label>
          <input
            value={userDetail.email}
            name="email"
            id="email"
            onChange={(e) => handleChange(e)}
            className="px-3 py-1 rounded-md outline-none bg-emerald-50"
            type="text"
            placeholder="Email..."
          />
        </div>
        <div className="flex flex-col gap-2 text-sm md:text-xl">
          <label htmlFor="password">Password</label>
          <input
            value={userDetail.password}
            name="password"
            id="password"
            onChange={(e) => handleChange(e)}
            className="px-3 py-1 rounded-md outline-none bg-emerald-50"
            type="text"
            placeholder="Password..."
          />
        </div>
        <button
          className={`px-3 h-10 rounded-md bg-emerald-200 font-semibold transition-all hover:bg-emerald-300 active:scale-95 ${
            userLoginStatus === "pending" ? "animate-pulse" : ""
          }`}
        >
          {userLoginStatus === "pending" ? <Loader /> : "Sign-In"}
        </button>
        <div className="flex justify-center text-sm">
          <span>
            Don't have account ? Sign-up
            <Link
              className="text-blue-700 transition-all hover:underline active:scale-95 "
              to="/register"
            >
              {" "}
              here
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
