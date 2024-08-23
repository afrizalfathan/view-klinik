import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { useState, useEffect } from "react";

function Antrian() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(
    () => {
      Axios.get("http://localhost:3000/queue/read_data", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((resolve) => setData(resolve.data))
        .catch((error) => console.log(error));
    },
    [
      /* data, token */
    ]
  );

  function filteredData(status) {
    return data.filter((el) => el.a_status === status);
  }

  const handleUpdateStatus = async (id, status) => {
    await Axios.put(
      `http://localhost:3000/queue/update_status/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  };

  async function handleDeleteAntrian(id) {
    try {
      await Axios.delete(`http://localhost:3000/queue/antrian_del/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(id);
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus antrian");
    }
  }

  return (
    <div className="container">
      <div className="status-queue-no">
        <h3>Antrian Sedang Di Proses</h3>
        <button onClick={() => console.log(filteredData("N"))}>Test</button>
        <Table bordered hover className="p-5">
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
              <th>UpdatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData("N").map((element) => (
              <>
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
                  <td>{element.updatedAt}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() =>
                        handleUpdateStatus(element.antrian_id, "Y")
                      }
                    >
                      Selesai
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteAntrian(element.antrian_id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="status-queue-no mt-5">
        <h3>Antrian Sudah Di Proses</h3>
        <Table bordered hover className="p-5">
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
              <th>UpdatedAt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData("Y").map((element) => (
              <tr key={element.id}>
                <td>{element.antrian_id}</td>
                <td>{element.Pasien.nama}</td>
                <td>{element.Pasien.no_hp}</td>
                <td>{element.Pasien.email}</td>
                <td>{element.Pasien.jenis_kelamin}</td>
                <td>{element.shift}</td>
                <td>{element.tanggal}</td>
                <td>{element.antrian}</td>
                <td>{element.createdAt}</td>
                <td>{element.updatedAt}</td>
                <td>
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
