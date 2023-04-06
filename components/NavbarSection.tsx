import { useState, useEffect, useRef } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Image from "next/image";
import light from "../assets/images/light.svg";
import dark from "../assets/images/moon.svg";
import { Card } from "react-bootstrap";

const NavbarSection = ({
  data,
  handleUpdate,
  handleDelete,
  setIsSearch,
  isSearch,
}: any) => {
  const [theme, setTheme] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [themeColor, setThemeColor] = useState("dark");

  const onFocus = () => {
    setIsSearch(false);
  };

  useEffect(() => {
    const getTheme: any = localStorage.getItem("theme");
    setTheme(JSON.parse(getTheme));
    if (theme) {
      setThemeColor("light");
    } else {
      setThemeColor("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(!theme);
    localStorage.setItem("theme", JSON.stringify(!theme));
  };

  // searchChange
  const onSearch = (e: any) => {
    const { value } = e.target;
    setSearchText(value);
  };

  // onSearchHandle
  const onSearchHandle = () => {
    setIsSearch(false);
  };

  return (
    <div className="position-relative">
      <Navbar bg={themeColor} variant="dark" className="mb-3">
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
                  onFocus={onFocus}
                />
                <Button variant="outline-success" onClick={onSearchHandle}>
                  Search
                </Button>
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
      </Navbar>
      {/* Search Data */}

      {isSearch ? null : (
        <div className="containerStyleCard d-flex gap-3 flex-wrap position-absolute card-top">
          {data
            .filter((item: any) => {
              return searchText.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(searchText);
            })
            .map((item: any, index: number) => {
              const { title, desc, time, type } = item;
              return (
                <Card key={index} style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title className="text-center">{title}</Card.Title>
                    <Card.Text>
                      Description: <b>{desc}</b>{" "}
                    </Card.Text>
                    <Card.Text>
                      Time: <b>{time}</b>{" "}
                    </Card.Text>
                    <Card.Text>
                      Type: <b>{type}</b>
                    </Card.Text>
                    <div className="text-end">
                      <Button
                        variant="success"
                        onClick={() => handleUpdate(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="ms-2"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default NavbarSection;
