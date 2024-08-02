import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-[calc(100vh-48px)] bg-orange-100 px-2 md:px-44 flex flex-col items-center pt-12">
      <Link
        to="/tset"
        className="bg-emerald-200 py-2 px-6 rounded-md font-semibold shadow-xl transition-all hover:bg-emerald-300 active:scale-95"
      >
        Time Sense Express Train
      </Link>
    </div>
  );
};

export default Home;
