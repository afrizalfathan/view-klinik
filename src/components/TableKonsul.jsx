import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

// Komponen Tabel untuk Transfer dengan Bukti Pembayaran Sudah di Upload
function TableKonsul({ data }) {
  const tableContainerStyle = {
    maxHeight: "200px",
    overflowY: "auto",
    overflowX: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff",
  };
  const navigate = useNavigate();
  return (
    <div style={tableContainerStyle}>
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
            <th>Total Harga Obat</th>
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
                  ? `Total ${element.obat.length} Obat`
                  : "Obat belum dimasukan"}
              </td>
              <td>
                {element.obat && element.obat.length > 0 ? (
                  <>
                    Rp.{" "}
                    {element.obat.reduce(
                      (total, obat) => total + parseInt(obat.harga),
                      0
                    )}
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
    </div>
  );
}

// Komponen Tabel untuk Transfer dengan Bukti Pembayaran Belum di Upload tapi Obat Sudah Ada
function TransferWithoutProofButMedicine({ data }) {
  return <TableKonsul data={data} />;
}

// Komponen Tabel untuk Transfer dengan Obat Belum di Input
function TransferNoMedicine({ data }) {
  return <TableKonsul data={data} />;
}

// Komponen Tabel untuk COD dengan Obat Sudah Diinput
function CodWithMedicine({ data }) {
  return <TableKonsul data={data} />;
}

// Komponen Tabel untuk COD dengan Obat Belum Diinput
function CodNoMedicine({ data }) {
  return <TableKonsul data={data} />;
}

export {
  TableKonsul,
  TransferWithoutProofButMedicine,
  TransferNoMedicine,
  CodWithMedicine,
  CodNoMedicine,
};
