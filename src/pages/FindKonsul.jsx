import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

function FindKonsul() {
  const [searchKonsul, setSearchKonsul] = useState("");

  let navigate = useNavigate();

  return (
    <div className="w-75 m-auto mt-5">
      <h3>Cek Konsul Anda</h3>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Masukan ID Konsultasi anda"
          onChange={(e) => setSearchKonsul(e.target.value)}
        />
        <Button
          variant="warning"
          onClick={() => navigate(`/konsul/details/${searchKonsul}`)}
        >
          Cek Konsultasi
        </Button>
      </InputGroup>
    </div>
  );
}

export default FindKonsul;
