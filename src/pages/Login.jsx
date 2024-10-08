import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  async function loginHandler() {
    try {
      const response = await Axios.post(
        "https://server-klinik-production.up.railway.app/user/login_handler",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        const userRole = response.data.user.role;

        // Navigasi berdasarkan role pengguna
        if (userRole === "admin") {
          navigate("/admin/antrianControl");
        } else if (userRole === "doctor") {
          navigate("/admin/konsultasi");
        } else {
          setErrorMessage("Role tidak dikenali");
        }
      } else {
        setErrorMessage("Login failed: No access token returned");
      }
    } catch (error) {
      console.error("Username atau Password Salah");
      setErrorMessage("Login failed: " + error.message);
    }
  }

  return (
    <div className="login-page container w-50">
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <Button variant="success" onClick={loginHandler}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
