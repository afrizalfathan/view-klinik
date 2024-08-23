import Axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import React from "react";

function ReadKonsultasi() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(
      "https://server-klinik-production.up.railway.app/konsul/read_all_konsul",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((resolve) => setData(resolve.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>No HP</th>
            <th>Jenis Kelamin</th>
            <th>Alergi</th>
            <th>Alamat</th>
            <th>Usia</th>
            <th>Keluhan</th>
            <th>Obat</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => (
            <tr key={index}>
              <td>{element.Pasien.nama}</td>
              <td>{element.Pasien.no_hp}</td>
              <td>{element.Pasien.jenis_kelamin}</td>
              <td>{element.alergi}</td>
              <td>{element.alamat}</td>
              <td>{element.Pasien.usia}</td>
              <td>{element.keluhan}</td>
              <td>
                {element.obat && element.obat.length > 0
                  ? element.obat.map((obat, idx) => (
                      <div key={idx}>
                        <p>Nama Obat: {obat.namaObat}</p>
                        <p>Dosis: {obat.dosis}</p>
                        <p>Harga: Rp. {obat.harga}</p>
                      </div>
                    ))
                  : "Obat belum dimasukan"}
              </td>
              <td>
                {element.obat && element.obat.length > 0 ? (
                  <>
                    <p>
                      <strong>Total Harga: </strong>
                      Rp.{" "}
                      {element.obat.reduce(
                        (total, obat) => total + parseInt(obat.harga),
                        0
                      )}
                    </p>
                  </>
                ) : (
                  "-"
                )}
              </td>
              <td>
                <Button
                  variant="warning"
                  onClick={() =>
                    navigate(
                      `/admin/konsultasi/konsul_details/${element.konsultasi_id}`
                    )
                  }
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <p>{errorMessage}</p> */}
    </div>
  );
}

export default ReadKonsultasi;
