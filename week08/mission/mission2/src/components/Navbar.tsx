import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const Navbar = () => {
  const { accessToken } = useAuth();
  console.log(accessToken);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className="text-xl font-bold text-gray-800 dark:text-white"
        >
          Spining Spining Dolimpan
        </Link>
        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className="text-gray-800 dark:text-white hover:text-blue-600"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-gray-800 dark:text-white hover:text-blue-600"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
        {accessToken && (
          <Link
            to="/my"
            className="text-gray-800 dark:text-white hover:text-blue-600"
          >
            마이 페이지
          </Link>
        )}
        <Link
          to="/search"
          className="text-gray-800 dark:text-white hover:text-blue-600"
        >
          검색
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
