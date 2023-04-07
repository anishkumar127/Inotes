import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Image from "next/image";
import light from "../assets/images/light.svg";
import dark from "../assets/images/moon.svg";

const NavbarSection = ({ onSearch }: any) => {
  const [theme, setTheme] = useState(false);
  const [themeColor, setThemeColor] = useState("bg-dark");

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
      {/* <Navbar bg={themeColor} variant="dark" className="mb-3">
        <Container fluid>
          <Navbar.Brand className={`${theme ? "light_mode" : ""}`} href="#home">
            📝iNotes
          </Navbar.Brand>
          <Navbar.Offcanvas placement="end">
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  href="#home"
                  className={`${theme ? "light_mode" : ""}`}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  href="#features"
                  className={`${theme ? "light_mode" : ""}`}
                >
                  About
                </Nav.Link>
              </Nav>

              <Form className="d-flex form_gap align-items-center">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={onSearch}
                />
                <Button variant="outline-success">Search</Button>
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
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar> */}

      <nav className={`${themeColor} navbar navbar-expand-lg bg-body-tertiary`}>
        <div className="container-fluid">
          <a className={`navbar-brand ${theme ? "light_mode" : ""}`} href="#">
            📝iNotes
          </a>
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
                <a
                  className={`nav-link active ${theme ? "light_mode" : ""}`}
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${theme ? "light_mode" : ""}`} href="#">
                  About
                </a>
              </li>
            </ul>
            <form className="d-flex form_gap align-items-center" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={onSearch}
              />
              {/* <button className="btn btn-outline-success" type="submit">
                Search
              </button> */}
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
