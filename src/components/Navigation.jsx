import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { FaHospitalUser } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import React from "react";

function Navigation() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <h3 className="pt-2">
              <FaHospitalUser className="me-1" />
              Klinik
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className="mt-2">
                <h5 className="fw-normal">Beranda</h5>
              </Nav.Link>
              <Nav.Link href="/queue" className="mt-2">
                <h5 className="fw-normal">Antrian</h5>
              </Nav.Link>
              <Nav.Link href="/queue/queue_display" className="mt-2">
                <h5 className="fw-normal">Daftar Antrian</h5>
              </Nav.Link>
              <Nav.Link href="/konsul" className="mt-2">
                <h5 className="fw-normal">Konsul</h5>
              </Nav.Link>
              <Nav.Link href="/login">
                <Button variant="success">Login</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Navigation;
