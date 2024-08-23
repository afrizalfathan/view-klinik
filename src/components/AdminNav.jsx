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
    <>
      <div className="d-flex">
        <div>
          <Button
            variant="primary"
            className="d-lg-none "
            onClick={toggleSidebar}
            style={{
              position: "fixed",
              top: "10px",
              left: "10px",
              zIndex: "1000",
            }}
          >
            <i className="bi bi-list"></i>
          </Button>
          <div
            className={`d-flex flex-column vh-100 p-3 bg-dark text-white ${
              showSidebar ? "d-block" : "d-none"
            } d-lg-block`}
            style={{ width: "200px", position: "sticky", top: 0 }}
          >
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
        </div>
        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AdminNav;
