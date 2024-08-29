import { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import validator from "validator";
import React from "react";
import sendEmail from "../components/sendEmail";

function Queue() {
  const [nama, setNama] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [email, setEmail] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [searchAntrian, setSearchAntrian] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);
  const [tanggal, setTanggal] = useState("");
  const [shift, setShift] = useState("");
  const [otpGenerator, setOtpGenerator] = useState("");
  const [otp, setOtp] = useState(0);
  const [otpValidasi, setOtpValidasi] = useState(true);
  const [usia, setUsia] = useState(0);

  const [showError, setShowError] = useState({
    nama: false,
    no_hp: false,
    email: false,
    jenis_kelamin: false,
    tanggal: false,
    usia: false,
    shift: false,
  });

  let navigate = useNavigate();

  async function createAntrian() {
    const idHandler = idKey();

    const queueData = {
      id: idHandler,
      nama,
      no_hp,
      email,
      jenis_kelamin,
      tanggal,
      usia,
      shift,
    };

    // Validasi input
    const errors = {
      nama: !nama,
      no_hp: !no_hp || !validator.isMobilePhone(no_hp, "id-ID"),
      email: !email || !validator.isEmail(email),
      jenis_kelamin: !jenis_kelamin,
      tanggal: !tanggal,
      usia: !usia,
      shift: !shift,
    };

    setShowError(errors);
    // Cek jika ada error, hentikan submit
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    try {
      if (parseInt(otp) === otpGenerator) {
        const response = await Axios.post(
          `https://server-klinik-production.up.railway.app/queue/create_queue`,
          queueData
        );

        if (response.status === 201) {
          navigate(`/queue/details/${idHandler}`);
        } else {
          console.log("Gagal membuat antrean:", response.data.error);
        }
      } else {
        setOtpValidasi(false);
      }
    } catch (err) {
      console.log("Error in createAntrian: ", err);
    }
  }

  async function handleSearchAntrian() {
    try {
      const response = await Axios.get(
        `https://server-klinik-production.up.railway.app/read_data/${searchAntrian}`
      );

      if (response.data.length > 0) {
        navigate(`/queue/details/${searchAntrian}`);
      } else {
        setNoDataFound(true); // Tampilkan alert jika data tidak ditemukan
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
      setNoDataFound(true); // Tampilkan alert jika ada error
    }
  }

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

  async function handleSearchAntrian() {
    try {
      const response = await Axios.get(
        `https://server-klinik-production.up.railway.app/read_data/${searchAntrian}`
      );

      if (response.data.length > 0) {
        navigate(`/queue/details/${searchAntrian}`);
      } else {
        setNoDataFound(true); // Tampilkan alert jika data tidak ditemukan
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
      setNoDataFound(true); // Tampilkan alert jika ada error
    }
  }

  return (
    <Container className="queue-page w-75">
      <Row>
        <Col>
          <h3 className="text-center mt-5">
            Selamat Datang,
            <br /> Silahkan Daftar Antrian
          </h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <div className="form-antrian">
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formNama">
                    <Form.Label>Nama : </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukan Nama"
                      onChange={(e) => setNama(e.target.value)}
                    />
                    {showError.nama && (
                      <Alert variant="danger">Nama tidak boleh kosong</Alert>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formUsia">
                    <Form.Label>Usia : </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Masukan Usia"
                      onChange={(e) => setUsia(e.target.value)}
                    />
                    {showError.usia && (
                      <Alert variant="danger">Usia tidak boleh kosong</Alert>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formNomorHP">
                    <Form.Label>Nomor HP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Masukan Nomor HP"
                      onChange={(e) => setNo_hp(e.target.value)}
                    />
                    {showError.no_hp && (
                      <Alert variant="danger">
                        Nomor HP tidak boleh kosong atau tidak valid
                      </Alert>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email : </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Masukan Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      variant="warning h-50 ms-4"
                      style={{ marginTop: "10px" }}
                      onClick={(e) =>
                        sendEmail({
                          setOtpGenerator,
                          e,
                          email,
                          subject: "Kode OTP untuk Verifikasi",
                        })
                      }
                    >
                      Send OTP
                    </Button>
                    {showError.email && (
                      <Alert variant="danger" className="mt-2">
                        Email tidak boleh kosong atau tidak valid
                      </Alert>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Pilih Jenis Kelamin : </Form.Label>
                    <Form.Select
                      defaultValue=""
                      className="mb-3"
                      onChange={(e) => setJenis_kelamin(e.target.value)}
                    >
                      <option value="" disabled>
                        Jenis Kelamin
                      </option>
                      <option value="Laki-Laki">Laki Laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </Form.Select>
                    {showError.jenis_kelamin && (
                      <Alert variant="danger">
                        Jenis kelamin tidak boleh kosong
                      </Alert>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Tanggal : </Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Masukan tanggal"
                      onChange={(e) => setTanggal(e.target.value)}
                    />
                    {showError.tanggal && (
                      <Alert variant="danger">Tanggal tidak boleh kosong</Alert>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formShift">
                    <Form.Label>Pilih Shift : </Form.Label>
                    <Form.Select
                      defaultValue=""
                      className="mb-3"
                      onChange={(e) => setShift(e.target.value)}
                    >
                      <option value="" disabled>
                        Pilih Shift
                      </option>
                      <option value="Shift 1 : 06.30 - 08.30">
                        Shift 1 : 06.30 - 08.30
                      </option>
                      <option value="Shift 2 : 16.30 - 19.30">
                        Shift 2 : 16.30 - 19.30
                      </option>
                    </Form.Select>
                    {showError.shift && (
                      <Alert variant="danger">Shift tidak boleh kosong</Alert>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3 otp-section" controlId="formOtp">
                    <Form.Label>Kode OTP : </Form.Label>
                    <Form.Control
                      type="number"
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    {otpValidasi === false && (
                      <Alert variant="danger">OTP Salah</Alert>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Button
                className="mt-3 mb-5"
                variant="primary"
                onClick={createAntrian}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col>
          <h3 className="text-center mt-5">
            Selamat Datang,
            <br /> Silahkan Daftar Antrian
          </h3>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <div className="aside-antrian">
            <h3>Cek Antrian Anda</h3>
            <InputGroup className="mb-3">
              <Form.Label>Masukan ID antrian : </Form.Label>
              <Form.Control
                placeholder="Masukan ID antrian"
                onChange={(e) => setSearchAntrian(e.target.value)}
              />
              <Button
                variant="warning"
                onClick={() => navigate(`/queue/details/${searchAntrian}`)}
              >
                Cek Antrian
              </Button>
            </InputGroup>
            {noDataFound && (
              <Alert variant="danger">Halaman tidak ditemukan</Alert>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Queue;
