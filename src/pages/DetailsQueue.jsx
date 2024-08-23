import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function DetailsQueue() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function resDetailAntrian() {
      try {
        const response = await Axios.get(
          `http://localhost:3000/queue/read_data/${id}`
        );
        setDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    resDetailAntrian();
  }, [id]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error.message}</Container>;
  }

  return (
    <Container className="queue-details-page d-flex justify-content-center align-items-center">
      {details.map((element, index) => (
        <Row key={index} className="w-100">
          <Col className="d-flex justify-content-center">
            <div
              className="details-body text-center p-4 rounded"
              style={{
                marginTop: "2vh",
                backgroundColor: "#FEFAE0",
                width: "100%",
                maxWidth: "500px", // Limit the width on larger screens
              }}
            >
              <h3 className="mb-2">Kode Antrian : {element.antrian_id}</h3>
              <h3 className="mb-2">Nomor Antrian anda</h3>
              <h3 className="my-2">{element.antrian}</h3>
              <p className="text-center">
                <b>{`(Pastikan screenshot halaman ini!)`}</b>
              </p>
              <ul className="queue-list-detail mt-3 list-unstyled">
                <li className="mt-2">Nama : {element.Pasien.nama}</li>
                <li className="mt-2">No HP : {element.Pasien.no_hp}</li>
                <li className="mt-2">Email : {element.Pasien.email}</li>
                <li className="mt-2">
                  Jenis Kelamin : {element.Pasien.jenis_kelamin}
                </li>
                <li className="mt-2">Tanggal : {element.tanggal}</li>
                <li className="mt-2">Shift : {element.shift}</li>
              </ul>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default DetailsQueue;
