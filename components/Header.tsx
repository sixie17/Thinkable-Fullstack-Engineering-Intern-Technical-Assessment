import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaSun,
  FaRegMoon,
} from "react-icons/fa";
import { useTheme } from "next-themes";
import Link from "next/link";
import Search from "@/components/Search";
import { useRouter } from "next/router";

function Header({ isLogin }: { isLogin: boolean }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  return (
    <header className="not-prose px-2 sm:px-4 py-2.5 w-full">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="mx-auto block font-semibold dark:text-white">
          Thinkable
        </Link>

        <ul className="mx-auto flex flex-wrap p-4 md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          {isLogin && (
            <li
              className="block py-2 pl-3 pr-4 text-gray-700 hover:text-blue-700 dark:hover:text-blue-700 rounded md:p-0 dark:text-white"
              aria-current="page"
            >
              <Search />
            </li>
          )}

          <li>
            <Link
              href="https://x.com/SakineYasser"
              className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:text-blue-700 dark:hover:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
            >
              <FaTwitter />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/in/yasser-sakine-952ab8197/"
              className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:text-blue-700 dark:hover:text-blue-700 md:p-0 dark:text-white"
            >
              <FaLinkedin />
            </Link>
          </li>

          <li>
            <button
              className="block py-2 pl-3 pr-4 rounded md:p-0"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <FaSun /> : <FaRegMoon />}
            </button>
          </li>
          
          <li>
            <button
              className="justify-center flex rounded-md w-20 bg-green-900"
              onClick={() => router.push('/edit')}
            >
              Post
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
export default Header;
