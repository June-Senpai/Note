import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  return (
    <header className="bg-[#323335] ">
      <nav>
        <ul className="mx-8 flex items-center justify-between">
          <li>
            <a href="/">
              <img
                src="https://www.appavengers.co/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo1.73be0d06.png&w=640&q=75"
                alt="HomePage"
                width={267}
                height={90}
              />
            </a>
          </li>
          <li>
            {/* <a href="/about">About</a> cw */}
            <ThemeButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;

const ThemeButton = () => {
  const { theme, setTheme, setSystemTheme } = useTheme();
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <section className="flex items-center gap-5">
      <button onClick={toggleTheme}>
        <Bulb theme={theme} />
      </button>
      <button onClick={setSystemTheme}>
        <System theme={theme} />
      </button>
    </section>
  );
};

// eslint-disable-next-line react/prop-types
const System = ({ theme }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"} `}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
      />
    </svg>
  );
};

// eslint-disable-next-line react/prop-types
const Bulb = ({ theme }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-6 w-6 ${theme === "dark" ? "text-white" : "text-black"} `}
    >
      <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
      <path
        fillRule="evenodd"
        d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
