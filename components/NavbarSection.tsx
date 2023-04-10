import { useEffect, useContext } from "react";
import Image from "next/image";
import light from "../assets/images/light.svg";
import dark from "../assets/images/moon.svg";
import Head from "next/head";
import Link from "next/link";
import { SearchContext } from "@/context/context";

const NavbarSection = () => {
  const {
    onSearch,
    themeColor,
    setThemeColor,
    theme,
    setTheme,
    inputGroupPlaceholder,
  }: any = useContext(SearchContext);

  useEffect(() => {
    if (theme) {
      document.body.style.backgroundColor = "white";
    } else {
      document.body.style.backgroundColor = "#212121";
    }
  }, [theme]);

  useEffect(() => {
    const getTheme: any = localStorage.getItem("theme");
    setTheme(JSON.parse(getTheme));
    if (theme) {
      setThemeColor("bg-light");
    } else {
      setThemeColor("bg-dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(!theme);
    localStorage.setItem("theme", JSON.stringify(!theme));
  };

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <nav className={`${themeColor} navbar navbar-expand-lg bg-body-tertiary`}>
        <div className="container-fluid">
          <Link
            className={`navbar-brand ${theme ? "light_mode" : "text-color"}`}
            href="/"
          >
            📝iNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link active ${
                    theme ? "light_mode" : "text-color"
                  }`}
                  aria-current="page"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${theme ? "light_mode" : "text-color"}`}
                  href="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex form_gap align-items-center " role="search">
              <input
                className={`${inputGroupPlaceholder} form-control me-2`}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={onSearch}
              />
              {theme ? (
                <Image
                  src={dark}
                  width={35}
                  height={35}
                  alt="dark_mode"
                  onClick={handleTheme}
                />
              ) : (
                <Image
                  src={light}
                  width={35}
                  height={35}
                  alt="light_mode"
                  onClick={handleTheme}
                />
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarSection;
