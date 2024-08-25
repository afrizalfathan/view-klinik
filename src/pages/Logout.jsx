import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "20%",
      }}
    >
      <h3 className="text-center">Apakah anda yakin ingin Log out ?</h3>
      <Button onClick={handleLogout} className="m-auto mt-3">
        Ya
      </Button>
    </div>
  );
}

export default Logout;
