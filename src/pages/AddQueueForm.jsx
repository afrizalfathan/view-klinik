import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";

function AddQueueForm() {
  const [showModal, setShowModal] = useState(false);
  const [nama, setNama] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [email, setEmail] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [shift, setShift] = useState("");
  const [usia, setUsia] = useState(0);

  // State for error messages
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  function idKey() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const randomNumber = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");

    const result = `01_${day}_${month}_${year}_${randomNumber}`;
    return result;
  }

  const token = localStorage.getItem("token");

  const validateForm = () => {
    const newErrors = {};

    if (!nama) newErrors.nama = "Nama tidak boleh kosong";
    if (!no_hp) newErrors.no_hp = "No HP tidak boleh kosong";
    if (!email) newErrors.email = "Email tidak boleh kosong";
    if (!jenis_kelamin)
      newErrors.jenis_kelamin = "Jenis kelamin tidak boleh kosong";
    if (!tanggal) newErrors.tanggal = "Tanggal tidak boleh kosong";
    if (!shift) newErrors.shift = "Shift tidak boleh kosong";
    if (!usia) newErrors.usia = "Usia tidak boleh kosong";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const queueData = {
      id: idKey(),
      nama,
      no_hp,
      email,
      jenis_kelamin,
      tanggal,
      usia,
      shift,
    };

    try {
      await Axios.post(
        "https://server-klinik-production.up.railway.app/queue/create_queue",
        queueData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/admin/antrianControl");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      alert("Gagal menambah antrian");
    }
  };

  return (
    <>
      <Form className="mb-5 w-100">
        <h4>Tambah Antrian</h4>
        <Form.Group className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            onChange={(e) => setNama(e.target.value)}
            required
            isInvalid={!!errors.nama}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nama}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>No HP</Form.Label>
          <Form.Control
            type="text"
            name="no_hp"
            onChange={(e) => setNo_hp(e.target.value)}
            required
            isInvalid={!!errors.no_hp}
          />
          <Form.Control.Feedback type="invalid">
            {errors.no_hp}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Jenis Kelamin</Form.Label>
          <Form.Select
            name="jenis_kelamin"
            onChange={(e) => setJenis_kelamin(e.target.value)}
            required
            isInvalid={!!errors.jenis_kelamin}
          >
            <option value="">Pilih...</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.jenis_kelamin}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Shift</Form.Label>
          <Form.Select
            name="shift"
            onChange={(e) => setShift(e.target.value)}
            required
            isInvalid={!!errors.shift}
          >
            <option value="">Pilih...</option>
            <option value="Shift 1 : 06.30 - 8.30">
              Shift 1 : 06.30 - 8.30
            </option>
            <option value="Shift 2 : 16.30 - 19.30">
              Shift 2 : 16.30 - 19.30
            </option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.shift}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tanggal</Form.Label>
          <Form.Control
            type="date"
            name="tanggal"
            onChange={(e) => setTanggal(e.target.value)}
            required
            isInvalid={!!errors.tanggal}
          />
          <Form.Control.Feedback type="invalid">
            {errors.tanggal}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Usia</Form.Label>
          <Form.Control
            type="text"
            name="usia"
            onChange={(e) => setUsia(e.target.value)}
            required
            isInvalid={!!errors.usia}
          />
          <Form.Control.Feedback type="invalid">
            {errors.usia}
          </Form.Control.Feedback>
        </Form.Group>
        <Button onClick={handleShowModal}>Tambah Antrian</Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin data yang dimasukkan sudah benar?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Periksa Kembali
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Ya, Benar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddQueueForm;
