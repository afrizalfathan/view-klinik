import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function Antrian() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = () => {
    Axios.get(
      `https://server-klinik-production.up.railway.app/queue/read_data`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((resolve) => setData(resolve.data))
      .catch((error) => console.log(error));
  };

  function filteredData(shift, status) {
    return data.filter(
      (el) =>
        el.shift === shift &&
        el.a_status === status &&
        el.tanggal === selectedDate
    );
  }

  const handleUpdateStatus = async (id, status) => {
    await Axios.put(
      `https://server-klinik-production.up.railway.app/queue/update_status/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchData();
  };

  const handleDeleteAntrian = async (id) => {
    try {
      await Axios.delete(
        `https://server-klinik-production.up.railway.app/queue/antrian_del/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus antrian");
    }
  };

  const createAntrian = () => {
    navigate("create_queue");
  };

  const tableContainerStyle = {
    maxHeight: "400px",
    overflowY: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
    backgroundColor: "#fff",
  };

  return (
    <div className="container">
      <h3>Daftar Antrian</h3>
      <div className="mt-4 mb-4 d-flex">
        <Form.Control
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-25"
        />
        <Button onClick={createAntrian} className="ms-4">
          Tambah Antrian
        </Button>
      </div>

      {/* Tabel untuk Shift 1 */}
      <h3>Antrian Shift 1 Sedang Diproses</h3>
      <div style={tableContainerStyle}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Jenis Kelamin</th>
              <th>Shift</th>
              <th>Tanggal</th>
              <th>Antrian</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData("Shift 1 : 06.30 - 8.30", "N").map((element) => (
              <tr key={element.antrian_id}>
                <td>{element.antrian_id}</td>
                <td>{element.Pasien.nama}</td>
                <td>{element.Pasien.no_hp}</td>
                <td>{element.Pasien.email}</td>
                <td>{element.Pasien.jenis_kelamin}</td>
                <td>{element.shift}</td>
                <td>{element.tanggal}</td>
                <td>{element.antrian}</td>
                <td>{element.createdAt}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleUpdateStatus(element.antrian_id, "Y")}
                  >
                    Selesai
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAntrian(element.antrian_id)}
                    className="ms-2"
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Tabel untuk Shift 2 */}
      <h3>Antrian Shift 2 Sedang Diproses</h3>
      <div style={tableContainerStyle}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Jenis Kelamin</th>
              <th>Shift</th>
              <th>Tanggal</th>
              <th>Antrian</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData("Shift 2 : 16.30 - 19.30", "N").map((element) => (
              <tr key={element.antrian_id}>
                <td>{element.antrian_id}</td>
                <td>{element.Pasien.nama}</td>
                <td>{element.Pasien.no_hp}</td>
                <td>{element.Pasien.email}</td>
                <td>{element.Pasien.jenis_kelamin}</td>
                <td>{element.shift}</td>
                <td>{element.tanggal}</td>
                <td>{element.antrian}</td>
                <td>{element.createdAt}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleUpdateStatus(element.antrian_id, "Y")}
                  >
                    Selesai
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteAntrian(element.antrian_id)}
                    className="ms-2"
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Tabel untuk Antrian Sudah Diproses */}
      <h3>Antrian Sudah Diproses</h3>
      <div style={tableContainerStyle}>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nama</th>
              <th>No HP</th>
              <th>Email</th>
              <th>Jenis Kelamin</th>
              <th>Shift</th>
              <th>Tanggal</th>
              <th>Antrian</th>
              <th>CreatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(
                (el) => el.a_status === "Y" && el.tanggal === selectedDate
              )
              .map((element) => (
                <tr key={element.antrian_id}>
                  <td>{element.antrian_id}</td>
                  <td>{element.Pasien.nama}</td>
                  <td>{element.Pasien.no_hp}</td>
                  <td>{element.Pasien.email}</td>
                  <td>{element.Pasien.jenis_kelamin}</td>
                  <td>{element.shift}</td>
                  <td>{element.tanggal}</td>
                  <td>{element.antrian}</td>
                  <td>{element.createdAt}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleUpdateStatus(element.antrian_id, "N")
                      }
                    >
                      Batalkan
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Antrian;
