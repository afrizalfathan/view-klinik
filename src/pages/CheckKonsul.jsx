import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import React from "react";

function CheckKonsul() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  useEffect(() => {
    async function resDataKonsul() {
      try {
        const response = await Axios.get(
          `http://localhost:3000/konsul/read_data/${id}`
        );
        const data = response.data;
        setDetails(data);

        setImageUploaded(
          `http://localhost:3000/uploads/${response.data.filename}` || false
        );
        setUploadedImageUrl(
          `http://localhost:3000/uploads/${data[0].b_pembayaran}` || ""
        );
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    resDataKonsul();
  }, [id, uploadedImageUrl]);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", uploadImage);

    try {
      const response = await Axios.post(
        `http://localhost:3000/konsul/upload_payment_proof/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUploaded(true);
      setUploadedImageUrl(
        `http://localhost:3000/uploads/${response.data.filename}`
      );
      alert("Bukti pembayaran berhasil diupload");
    } catch (error) {
      console.log(error);
      alert("Gagal mengupload bukti pembayaran");
    }
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  return (
    <Container className="d-flex flex-column align-items-center queue-details-page">
      <div
        className="details-body"
        style={{
          marginTop: "10vh",
          width: "100%",
          maxWidth: "1000px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          backgroundColor: "#fff",
        }}
      >
        {details.map((element, index) => (
          <div key={index}>
            <h3 className="text-center mb-4">
              Kode Konsultasi : {element.konsultasi_id}
            </h3>

            {(element.k_status === "Proses" && element.obat?.length <= 0) ||
              (element.obat && (
                <Alert variant="warning">
                  <div className="status-konsul text-center mt-4">
                    <h4>Status</h4>
                    <p>Konsultasimu Sedang Di Proses</p>
                  </div>
                </Alert>
              ))}

            {element.b_pembayaran && element.obat && (
              <div className="status-konsul text-center mt-4 mb-5">
                <Alert variant="primary">
                  <p>Konsultasimu Akan Di Kirim </p>
                  <p>Silahkan Tunggu ya</p>
                </Alert>
              </div>
            )}
            {element.k_status === "Selesai" && element.obat && (
              <div className="status-konsul text-center mt-4 mb-5">
                <Alert variant="success">
                  <p>Obat sudah terkirim ke alamat</p>
                  <p>Semoga Lekas Sembuh :D</p>
                </Alert>
              </div>
            )}
            <div className="table-responsive">
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <th>Nama</th>
                    <td>{element.Pasien.nama}</td>
                  </tr>
                  <tr>
                    <th>No HP</th>
                    <td>{element.Pasien.no_hp}</td>
                  </tr>
                  <tr>
                    <th>Jenis Kelamin</th>
                    <td>{element.Pasien.jenis_kelamin}</td>
                  </tr>
                  <tr>
                    <th>Usia</th>
                    <td>{element.Pasien.usia}</td>
                  </tr>
                  <tr>
                    <th>Keluhan</th>
                    <td>{element.keluhan}</td>
                  </tr>
                  <tr>
                    <th>Alamat</th>
                    <td>{element.alamat}</td>
                  </tr>
                  <tr>
                    <th>Metode Pembayaran</th>
                    <td>
                      {element.m_pembayaran === "COD"
                        ? "Cash on Delivery"
                        : "Transfer"}
                    </td>
                  </tr>
                </tbody>
              </Table>

              <h5 className="text-center mt-4">Daftar Obat</h5>
              {element.obat ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nama Obat</th>
                      <th>Dosis</th>
                      <th>Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {element.obat.map((obat, idx) => (
                      <tr key={idx}>
                        <td>{obat.namaObat}</td>
                        <td>{obat.dosis}</td>
                        <td>Rp. {obat.harga}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2">
                        <strong>Total Harga</strong>
                      </td>
                      <td>
                        <strong>
                          Rp.{" "}
                          {element.obat.reduce(
                            (total, obat) => total + parseInt(obat.harga),
                            0
                          )}
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              ) : (
                "Konsultasi sedang di proses"
              )}
            </div>
            {element.m_pembayaran === "Transfer" &&
              element.obat?.length > 0 && (
                <div className="mt-4">
                  <h5>Bukti Pembayaran</h5>
                  {element.b_pembayaran ? (
                    <Alert variant="success">
                      Bukti Pembayaran sudah diupload
                      <br />
                      <img
                        src={uploadedImageUrl}
                        alt="Bukti Pembayaran"
                        style={{
                          maxWidth: "40%",
                          height: "auto",
                          marginTop: "10px",
                          borderRadius: "5px",
                          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                        }}
                      />
                    </Alert>
                  ) : (
                    <Alert variant="danger">
                      Bukti Pembayaran belum diupload. Silakan upload bukti
                      pembayaran Anda.
                    </Alert>
                  )}
                  <Form onSubmit={handleImageUpload}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Pilih gambar</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setUploadImage(e.target.files[0])}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Kirim
                    </Button>
                  </Form>
                </div>
              )}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default CheckKonsul;
