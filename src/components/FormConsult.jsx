import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import validator from "validator";

function FormConsult({
  setNama,
  nama,
  setNo_hp,
  no_hp,
  setAlergi,
  alergi,
  setJenis_kelamin,
  jenis_kelamin,
  setKeluhan,
  keluhan,
  setM_pembayaran,
  m_pembayaran,
  setAlamat,
  alamat,
  usia,
  createConsultHandler,
  setEmail,
  sendEmail,
  email,
  setOtpGenerator,
  setUsia,
  setOtp,
  otpValidasi,
}) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const validateForm = () => {
    const newErrors = {};
    if (!nama) newErrors.nama = "Nama tidak boleh kosong";
    if (!no_hp || !validator.isMobilePhone(no_hp, "id-ID"))
      newErrors.no_hp = "Nomor HP tidak valid";
    if (!email || !validator.isEmail(email))
      newErrors.email = "Email tidak valid";
    if (!jenis_kelamin) newErrors.jenis_kelamin = "Jenis kelamin harus dipilih";
    if (!keluhan) newErrors.keluhan = "Keluhan tidak boleh kosong";
    if (!alergi) newErrors.alergi = "Alergi tidak boleh kosong";
    if (!alamat) newErrors.alamat = "Alamat tidak boleh kosong";
    if (!usia || usia <= 0) newErrors.usia = "Usia harus lebih dari 0";
    if (!m_pembayaran)
      newErrors.m_pembayaran = "Metode pembayaran harus dipilih";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = (e) => {
    if (validateForm()) {
      createConsultHandler(e);
      setShowModal(false);
    }
  };

  return (
    <div className="create-consult-pages">
      <Container className="queue-page w-75">
        <h3 className="text-center mt-5">
          Selamat Datang,
          <br /> Silahkan Daftar Konsultasi
        </h3>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="nama" className="mb-3">
                <Form.Label>Nama : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukan Nama"
                  onChange={(e) => setNama(e.target.value)}
                />
                {errors.nama && <Alert variant="danger">{errors.nama}</Alert>}
              </Form.Group>

              <Form.Group controlId="alergi" className="mb-3">
                <Form.Label>Alergi : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukan Alergi"
                  onChange={(e) => setAlergi(e.target.value)}
                />
                {errors.alergi && (
                  <Alert variant="danger">{errors.alergi}</Alert>
                )}
              </Form.Group>
              <Form.Group controlId="alamat" className="mb-3">
                <Form.Label>Alamat : </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Masukan Alamat"
                  onChange={(e) => setAlamat(e.target.value)}
                />
                {errors.alamat && (
                  <Alert variant="danger">{errors.alamat}</Alert>
                )}
              </Form.Group>
              <Form.Group controlId="usia" className="mb-3">
                <Form.Label>Usia : </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Masukan Usia"
                  onChange={(e) => setUsia(e.target.value)}
                />
                {errors.usia && <Alert variant="danger">{errors.usia}</Alert>}
              </Form.Group>
              <div className="otp-section mb-3">
                <Form.Label>Kode OTP</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => setOtp(e.target.value)}
                />
                {otpValidasi === false && (
                  <Alert variant="danger">Otp Salah</Alert>
                )}
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={handleShowModal}
                >
                  Submit
                </Button>
              </div>
            </Col>

            <Col md={6}>
              <Form.Group controlId="no-hp" className="mb-3">
                <Form.Label>Nomor Hp : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukan No HP"
                  onChange={(e) => setNo_hp(e.target.value)}
                />
                {errors.no_hp && <Alert variant="danger">{errors.no_hp}</Alert>}
              </Form.Group>
              <Form.Group controlId="formGender" className="mb-3">
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
                {errors.jenis_kelamin && (
                  <Alert variant="danger">{errors.jenis_kelamin}</Alert>
                )}
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email : </Form.Label>
                <Row>
                  <Col md={8}>
                    <Form.Control
                      type="email"
                      placeholder="Masukan Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                      <Alert variant="danger">{errors.email}</Alert>
                    )}
                  </Col>
                  <Col md={4}>
                    <Button
                      variant="warning w-100"
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
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId="keluhan" className="mb-3">
                <Form.Label>Keluhan : </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Masukan Keluhan"
                  onChange={(e) => setKeluhan(e.target.value)}
                />
                {errors.keluhan && (
                  <Alert variant="danger">{errors.keluhan}</Alert>
                )}
              </Form.Group>
              <Form.Group controlId="formPayment" className="mb-3">
                <Form.Label>Metode Pembayaran : </Form.Label>
                <Form.Select
                  defaultValue=""
                  className="mb-3"
                  onChange={(e) => setM_pembayaran(e.target.value)}
                >
                  <option value="" disabled>
                    Pilih Metode Pembayaran
                  </option>
                  <option value="Transfer">Transfer</option>
                  <option value="COD">Cash On Delivery</option>
                </Form.Select>
                {errors.m_pembayaran && (
                  <Alert variant="danger">{errors.m_pembayaran}</Alert>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>

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
          <Button variant="primary" onClick={handleConfirm}>
            Ya, Benar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormConsult;
