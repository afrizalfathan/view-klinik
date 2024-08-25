import Axios from "axios";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {
  TableKonsul,
  TransferWithoutProofButMedicine,
  TransferNoMedicine,
  CodWithMedicine,
  CodNoMedicine,
} from "../components/TableKonsul";

function ReadKonsultasi() {
  const [data, setData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const token = localStorage.getItem("token");

  useEffect(() => {
    Axios.get(
      "https://server-klinik-production.up.railway.app/konsul/read_all_konsul",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, [token]);

  const renderTable = () => {
    if (paymentMethod === "transfer") {
      const dataWithProof = data.filter(
        (el) =>
          el.m_pembayaran.toLowerCase() === "transfer" &&
          el.b_pembayaran &&
          el.obat &&
          el.obat.length > 0
      );
      const dataWithoutProofButMedicine = data.filter(
        (el) =>
          el.m_pembayaran.toLowerCase() === "transfer" &&
          !el.b_pembayaran &&
          el.obat &&
          el.obat.length > 0
      );
      const dataNoMedicine = data.filter(
        (el) =>
          el.m_pembayaran.toLowerCase() === "transfer" &&
          (!el.obat || el.obat.length === 0)
      );

      return (
        <>
          <h3>Tabel Transfer (Bukti Pembayaran Sudah di-upload)</h3>
          <TableKonsul data={dataWithProof} />
          <h3>
            Tabel Transfer (Bukti Pembayaran Belum di-upload, Obat Sudah Ada)
          </h3>
          <TransferWithoutProofButMedicine data={dataWithoutProofButMedicine} />
          <h3>Tabel Transfer (Obat Belum di-input)</h3>
          <TransferNoMedicine data={dataNoMedicine} />
        </>
      );
    } else if (paymentMethod === "cod") {
      const dataWithMedicine = data.filter(
        (el) =>
          el.m_pembayaran.toLowerCase() === "cod" &&
          el.obat &&
          el.obat.length > 0
      );
      const dataNoMedicine = data.filter(
        (el) =>
          el.m_pembayaran.toLowerCase() === "cod" &&
          (!el.obat || el.obat.length === 0)
      );

      return (
        <div>
          <h3 className="mt-5">Tabel COD (Obat Sudah di-input)</h3>
          <CodWithMedicine data={dataWithMedicine} />
          <h3 className="mt-5">Tabel COD (Obat Belum di-input)</h3>
          <CodNoMedicine data={dataNoMedicine} />
        </div>
      );
    }
  };

  return (
    <div>
      <h2>Data Konsultasi</h2>
      <Form>
        <Form.Check
          type="radio"
          label="Transfer"
          name="paymentMethod"
          value="transfer"
          checked={paymentMethod === "transfer"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        <Form.Check
          type="radio"
          label="COD"
          name="paymentMethod"
          value="cod"
          checked={paymentMethod === "cod"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
      </Form>
      {renderTable()}
    </div>
  );
}

export default ReadKonsultasi;
