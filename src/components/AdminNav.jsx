import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Outlet } from "react-router-dom";

function AdminNav() {
  const [role, setRole] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user role from JWT or server
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1]));
      setRole(user.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Ensures that the content fits within the viewport
      }}
    >
      {/* Sidebar */}
      <div
        className={`d-flex flex-column p-3 bg-dark text-white ${
          showSidebar ? "d-block" : "d-none"
        } d-lg-flex`}
        style={{
          width: "20%",
          minWidth: "200px", // To maintain a minimum width for the sidebar
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          zIndex: "1000", // Ensure the sidebar is above other content
        }}
      >
        <Button
          variant="primary"
          className="d-lg-none"
          onClick={toggleSidebar}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: "1001",
          }}
        >
          <i className="bi bi-list"></i>
        </Button>
        <Button
          variant="secondary"
          className="d-lg-none mb-4"
          onClick={toggleSidebar}
        >
          X
        </Button>
        <div className="mb-4">
          <h2>Klinik</h2>
        </div>
        <Nav className="flex-column">
          <Nav.Link href="/admin">Home</Nav.Link>
          {role === "admin" && (
            <Nav.Link href="/admin/antrianControl">Antrian</Nav.Link>
          )}
          {role === "doctor" && (
            <Nav.Link href="/admin/konsultasi">Konsultasi</Nav.Link>
          )}
          <Nav.Link>
            <Button variant="danger" onClick={() => handleLogout()}>
              Log out
            </Button>
          </Nav.Link>
        </Nav>
      </div>

      {/* Main content */}
      <main
        className="ps-3"
        style={{
          marginLeft: "20%", // Adjusts the main content to start after the sidebar
          width: "80%",
          overflowY: "auto", // Allows scrolling for main content
          padding: "1rem", // Adds some padding for the content area
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminNav;
