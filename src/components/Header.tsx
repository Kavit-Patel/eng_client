import { useEffect, useState } from "react";
import { FaTrain, FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RooteState } from "../store/Store";
import { userLogout } from "../store/userReducer/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RooteState) => state.user);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [userMenu, setUserMenu] = useState<boolean>(false);
  useEffect(() => {
    window.addEventListener("click", () => {
      setShowMenu(false);
      setUserMenu(false);
    });
  }, []);

  return (
    <div className="w-full h-12 bg-orange-200 flex px-2 md:px-44 justify-between items-center ">
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl cursor-pointer  transition-all active:scale-95"
      >
        <FaTrain />
        <span>Tset</span>
      </Link>
      <div className="relative hidden md:flex items-center gap-6 text-lg">
        <Link to="#" className="cursor-pointer transition-all active:scale-95">
          Explore
        </Link>
        {user ? (
          <>
            <div className="relative cursor-pointer  transition-all active:scale-95">
              <FaUser
                onClick={(e) => {
                  e.stopPropagation();
                  setUserMenu((prev) => !prev);
                }}
              />
            </div>
            {userMenu && (
              <div className="absolute top-9 left-0 border border-violet-300 min-w-44 min-h-44 bg-orange-200 rounded-md flex flex-col gap-1 p-4">
                <div className="w-full pl-2 md:pl-6  text-violet-600 font-semibold">
                  Hi , {user.name}
                </div>
                <Link
                  to="/"
                  onClick={() => dispatch(userLogout())}
                  className="w-full pl-2 md:pl-6 text-violet-600 font-semibold"
                >
                  LogOut
                </Link>
              </div>
            )}
          </>
        ) : (
          <Link
            to="/login"
            className="cursor-pointer transition-all active:scale-95"
          >
            Login
          </Link>
        )}
      </div>
      <div className="flex md:hidden cursor-pointer">
        <GiHamburgerMenu
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu((prev) => !prev);
          }}
        />
        {showMenu && (
          <div className="absolute left-0 top-12 w-full h-[calc(100vh-48px)] bg-orange-200 flex flex-col justify-center items-center">
            {user ? (
              <>
                <div className="text-violet-600 font-semibold ">
                  Hi , {user.name}
                </div>
                <Link
                  to="/"
                  onClick={() => dispatch(userLogout())}
                  className=" text-violet-600 font-semibold cursor-pointer  transition-all active:scale-95"
                >
                  LogOut
                </Link>
              </>
            ) : (
              <Link
                to="#"
                className="text-violet-600 font-semibold cursor-pointer transition-all active:scale-95"
              >
                Login
              </Link>
            )}
            <Link
              to="#"
              className="text-violet-600 font-semibold cursor-pointer transition-all active:scale-95"
            >
              Explore
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
