import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import {
  FaRegMoon,
  FaRegSun,
  FaBars,
  FaInfo,
  FaHome,
  FaSearch,
  FaLocationArrow,
} from "react-icons/fa";
import constants from "../../constants/constants";

export default function Header() {
  const logoHeight = 40;
  const logoWidth = 40;

  const [theme, setTheme] = useState(
    localStorage.getItem("sky-sculptor-theme")
  );
  const [showMenu, setShowMenu] = useState(false);

  // Default theme names from daisyUI ( also need to import daisyUI themes in tailwind.config.js)
  const primaryThemeName = constants.PRIMARY_STYLE;
  const secondaryThemeName = constants.SECONDARY_STYLE;

  useEffect(() => {
    const theme = localStorage.getItem("sky-sculptor-theme");
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("sky-sculptor-theme", theme);
      setTheme(theme);
    } else {
      document.documentElement.setAttribute("data-theme", secondaryThemeName);
      localStorage.setItem("sky-sculptor-theme", secondaryThemeName);
      setTheme(secondaryThemeName);
    }
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.getAttribute("data-theme");

    if (
      theme === secondaryThemeName ||
      localStorage.getItem("sky-sculptor-theme") === secondaryThemeName
    ) {
      root.setAttribute("data-theme", primaryThemeName);
      localStorage.setItem("sky-sculptor-theme", primaryThemeName);
      setTheme(primaryThemeName);
    } else {
      root.setAttribute("data-theme", secondaryThemeName);
      localStorage.setItem("sky-sculptor-theme", secondaryThemeName);
      setTheme(secondaryThemeName);
    }
  }

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <header className="bg-primary py-4 text-primary-content flex justify-between p-20">
      <div className="flex flex-row items-center">
        <Link
          to="/"
          className="text-primary-content hover:text-base-100 text-xl font-bold ml-5"
        >
          Sky Skulptor
          <img
            src={logo}
            height={logoHeight}
            width={logoWidth}
            alt="SkySkulptor"
            className="ml-2 inline "
          />
        </Link>
      </div>
      <div className="flex items-center">
        <ul
          className={`lg:flex space-y-4 lg:space-y-0 lg:space-x-4 p-4 ${
            showMenu ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              to="/"
              className="hover:text-base-100 flex items-center gap-1"
            >
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/local"
              className="hover:text-base-100 flex items-center gap-1"
            >
              <FaLocationArrow />
              Local forecast
            </Link>
          </li>
          <li>
            <Link
              to="/today"
              className="hover:text-base-100 flex items-center gap-1"
            >
              <FaInfo />
              Todays forecast
            </Link>
          </li>
          <li>
            <Link
              to="/weekly"
              className="hover:text-base-100 flex items-center gap-1"
            >
              <FaSearch />
              Weeks forecast
            </Link>
          </li>
          <button
            className="hover:text-base-100 flex items-center gap-1"
            onClick={toggleTheme}
          >
            {theme === secondaryThemeName ? <FaRegMoon /> : <FaRegSun />}
            Toggle theme
          </button>
        </ul>
        <button
          className="text-xl font-bold ml-5 lg:hidden"
          onClick={toggleMenu}
        >
          <FaBars />
        </button>
      </div>
    </header>
  );
}
