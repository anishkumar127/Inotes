import Offcanvas from "react-bootstrap/Offcanvas";
import { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Image from "next/image";
import light from "../assets/images/light.svg";
import dark from "../assets/images/moon.svg";
import { Card } from "react-bootstrap";

function OffcanvasExample() {
  return (
    <>
      {/* {[false, "sm", "md", "lg", "xl", "xxl"].map((expand) => ( */}
      <Navbar bg="dark" className="mb-3">
        <Container fluid>
          <Navbar.Brand href="#">📝iNotes</Navbar.Brand>

          <Navbar.Offcanvas placement="end">
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">About</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default OffcanvasExample;
