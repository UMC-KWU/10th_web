import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import { HamburgerButton } from "./HamburgerButton.tsx";
import { useSidebar } from "../hooks/useSidebar.tsx";
import { Sidebar } from "./Sidebar.tsx";

const Navbar = () => {
  const { accessToken } = useAuth();
  console.log(accessToken);

  const { isOpen, toggle, close } = useSidebar();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <HamburgerButton isOpen={isOpen} onClick={toggle} />
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            LP 사이트
          </span>
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 dark:text-white"
          >
            Spining Spining Dolimpan
          </Link>
          <Sidebar isOpen={isOpen} onClose={close} />
        </div>
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
