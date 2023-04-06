import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Image from "next/image";
import light from "../assets/images/light.svg";
import dark from "../assets/images/moon.svg";

interface Props {
  data: any;
}

const NavbarSection = ({ data }: Props) => {
  const [theme, setTheme] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [matchedSearch, setMatchedSearch] = useState([]);

  useEffect(() => {
    const getTheme: any = localStorage.getItem("theme");
    setTheme(JSON.parse(getTheme));
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
    const res = data.filter((item: any, i: any) => {
      console.log(i);
      return item.title === searchText;
    });
    // const index = data.filter
    // const r =
    console.log(res);
    if (res) {
      setMatchedSearch(res);
    }
  };

  console.log(matchedSearch);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand href="#home">📝iNotes</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={onSearch}
              />
              <Button variant="outline-success" onClick={onSearchHandle}>
                Search
              </Button>
            </Form>
            {theme ? (
              <Image
                src={dark}
                width={35}
                height={35}
                alt="dark_mode"
                className="bg-white"
                onClick={handleTheme}
              />
            ) : (
              <Image
                src={light}
                width={35}
                height={35}
                alt="light_mode"
                className="bg-white"
                onClick={handleTheme}
              />
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* <div>{}</div> */}
    </>
  );
};

export default NavbarSection;
