import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RooteState } from "../store/Store";
import Loader from "../components/Loader";
import { userRegister } from "../store/userReducer/userApi";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userSignupStatus } = useSelector((state: RooteState) => state.user);
  const [userDetail, setUserDetail] = useState<{
    name: string;
    email: string;
    password: string;
  }>({ name: "", email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(userRegister(userDetail));
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
        <h2 className="underline text-lg md:text-4xl text-center">Register</h2>
        <div className="flex flex-col gap-2 text-sm md:text-xl">
          <label htmlFor="name">Name</label>
          <input
            value={userDetail.name}
            name="name"
            id="name"
            onChange={(e) => handleChange(e)}
            className="px-3 py-1 rounded-md outline-none bg-emerald-50"
            type="text"
            placeholder="Name..."
          />
        </div>
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
            userSignupStatus === "pending" ? "animate-pulse" : ""
          }`}
        >
          {userSignupStatus === "pending" ? <Loader /> : "Sign-Up"}
        </button>
        <div className="flex justify-center text-sm">
          <span>
            Already have an account ? Sign-in
            <Link
              className="text-blue-700 transition-all hover:underline active:scale-95 "
              to="/login"
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

export default Register;
