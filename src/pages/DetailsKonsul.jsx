import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import sendEmailEditKonsul from "../components/sendEmailEditKonsul";
import Axios from "axios";
import React from "react";

function DetailsKonsul() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  const [newObatList, setNewObatList] = useState([]);
  const [status, setStatus] = useState("Proses");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  useEffect(() => {
    async function getDetailsKonsul() {
      try {
        const response = await Axios.get(
          `http://localhost:3000/konsul/konsul_details/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const konsulData = response.data;
        setData(konsulData);

        const takeObatObject = konsulData.flatMap((items) =>
          (items.obat || []).map((element) => ({
            id: element.obatId,
            dosis: element.dosis,
            namaObat: element.namaObat,
            harga: element.harga,
          }))
        );
        setNewObatList(takeObatObject);

        // Set image URL
        const imageURL =
          konsulData.length > 0
            ? `http://localhost:3000/uploads/${konsulData[0].b_pembayaran}`
            : "";
        setUploadedImageUrl(imageURL);
      } catch (error) {
        console.log(error);
      }
    }

    getDetailsKonsul();
  }, [id, token]);

  const handleNewObatChange = (index, event) => {
    const { name, value } = event.target;
    const updatedObatList = newObatList.map((obat, idx) =>
      idx === index ? { ...obat, [name]: value } : obat
    );
    setNewObatList(updatedObatList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedObat = newObatList.map((obat) =>
      obat.id ? obat : { ...obat, id: Math.round(Math.random() * 800) }
    );

    const konsultasiData = { ...data, obat: updatedObat, k_status: status };

    try {
      const response = await Axios.put(
        `http://localhost:3000/konsul/konsul_details/update/${id}`,
        konsultasiData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);

      // Mengambil email dari data yang diperoleh
      const emailPenerima = data.length > 0 ? data[0].Pasien.email : null;
      if (emailPenerima) {
        await sendEmailEditKonsul({
          e,
          email: emailPenerima,
          details: konsultasiData,
        });
      } else {
        alert("Email penerima tidak ditemukan");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addObat = () => {
    const idKey = Math.round(Math.random() * 800);
    setNewObatList([
      ...newObatList,
      { id: idKey, namaObat: "", dosis: "", harga: "" }, // ID selalu didefinisikan
    ]);
  };

  const removeObat = (index) => {
    const updatedObatList = newObatList.filter((_, idx) => idx !== index);
    setNewObatList(updatedObatList);
  };

  return (
    <div className="create-consult-details-pages">
      <h1>Detail Konsultasi</h1>
      <Container className="konsul-detail-page w-100">
        <Form className="w-100">
          <div className="row">
            <div className="col-md-6">
              {data.map((items) => (
                <div className="form-edit-konsul" key={items.id}>
                  <Form.Group controlId="id" className="mb-3">
                    <Form.Label>Id :</Form.Label>
                    <Form.Control
                      type="text"
                      value={items.konsultasi_id}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="nama" className="mb-3">
                    <Form.Label>Nama :</Form.Label>
                    <Form.Control
                      type="text"
                      value={items.Pasien.nama}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="no-hp" className="mb-3">
                    <Form.Label>Nomor Hp :</Form.Label>
                    <Form.Control
                      type="number"
                      value={items.Pasien.no_hp}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Jenis Kelamin :</Form.Label>
                    <Form.Control
                      type="text"
                      value={items.Pasien.jenis_kelamin}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="ttl" className="mb-3">
                    <Form.Label>Usia :</Form.Label>
                    <Form.Control
                      type="number"
                      value={items.Pasien.usia}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="alamat" className="mb-3">
                    <Form.Label>Alamat :</Form.Label>
                    <Form.Control as="textarea" value={items.alamat} readOnly />
                  </Form.Group>{" "}
                  <Form.Group controlId="m_pembayaran" className="mb-3">
                    <Form.Label>Metode Pembayaran :</Form.Label>
                    <Form.Control
                      type="text"
                      value={items.m_pembayaran}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group controlId="b_pembayaran" className="mb-3">
                    <Form.Label>Bukti Pembayaran :</Form.Label>
                    {uploadedImageUrl ===
                    "http://localhost:3000/uploads/null" ? (
                      <p>Bukti Pembayaran Belum Diupload</p>
                    ) : (
                      <img
                        src={uploadedImageUrl}
                        style={{
                          maxWidth: "40%",
                          height: "auto",
                          borderRadius: "5px",
                          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                          marginLeft: "5%",
                        }}
                      />
                    )}
                  </Form.Group>
                </div>
              ))}
            </div>
            <div className="col-md-6">
              {data.map((items) => (
                <div className="form-edit-konsul" key={items.id}>
                  <Form.Group controlId="alergi" className="mb-3">
                    <Form.Label>Alergi :</Form.Label>
                    <Form.Control type="text" value={items.alergi} readOnly />
                  </Form.Group>
                  <Form.Group controlId="keluhan" className="mb-3">
                    <Form.Label>Keluhan :</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={items.keluhan}
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Status :</Form.Label>

                    <Form.Select
                      defaultValue=""
                      onChange={(e) => setStatus(e.target.value)}
                      className="mb-3"
                    >
                      <option value="" disabled>
                        Status :
                      </option>
                      <option value="Proses">Proses</option>
                      <option value="Dikirim">Dikirim</option>
                      <option value="Selesai">Selesai</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="obat-container">
                    <h2>Obat</h2>
                    {newObatList.map((obat, idx) => (
                      <div key={idx} className="d-flex align-items-center">
                        <Form.Group
                          controlId={`namaObat${idx}`}
                          className="mb-3 me-2"
                        >
                          <Form.Label>Nama Obat :</Form.Label>
                          <Form.Control
                            type="text"
                            name="namaObat"
                            value={obat.namaObat || ""}
                            placeholder={obat.namaObat ? "" : "Masukan obat"}
                            onChange={(e) => handleNewObatChange(idx, e)}
                          />
                        </Form.Group>
                        <Form.Group
                          controlId={`dosis${idx}`}
                          className="mb-3 me-2"
                        >
                          <Form.Label>Dosis :</Form.Label>
                          <Form.Control
                            type="text"
                            name="dosis"
                            value={obat.dosis || ""}
                            placeholder={obat.dosis ? "" : "Masukan dosis"}
                            onChange={(e) => handleNewObatChange(idx, e)}
                          />
                        </Form.Group>
                        <Form.Group
                          controlId={`harga${idx}`}
                          className="mb-3 me-2"
                        >
                          <Form.Label>Harga :</Form.Label>
                          <Form.Control
                            type="number"
                            name="harga"
                            value={obat.harga || ""}
                            placeholder={obat.harga ? "" : "Masukan harga"}
                            onChange={(e) => handleNewObatChange(idx, e)}
                          />
                        </Form.Group>
                        <Button
                          variant="danger"
                          onClick={() => removeObat(idx)}
                        >
                          Hapus
                        </Button>
                      </div>
                    ))}
                    <Button variant="secondary" onClick={addObat}>
                      Tambah Obat
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default DetailsKonsul;
