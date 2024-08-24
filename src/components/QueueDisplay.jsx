import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const QueueDisplay = () => {
  const [shift1Queue, setShift1Queue] = useState([]);
  const [shift2Queue, setShift2Queue] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const shift1Start = "06.30";
    const shift1End = "08.30";
    const shift2Start = "16:30";
    const shift2End = "19.30";

    const currentTime = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (currentTime >= shift1Start && currentTime <= shift1End) {
      axios
        .get(`http://localhost:3000/queue/shift/1/${currentDate}`)
        .then((response) => {
          setShift1Queue(response.data);
        })
        .catch((error) => console.log(error));
    }

    if (currentTime >= shift2Start && currentTime <= shift2End) {
      axios
        .get(`http://localhost:3000/queue/shift/2/${currentDate}`)
        .then((response) => {
          setShift2Queue(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [currentDate, shift1Queue, shift2Queue]);

  const click = () => {
    console.log(shift2Queue);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Antrian Hari Ini</h1>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card className="text-center queue-card p-4">
            <div className="shift-icon">
              <i className="bi bi-clock"></i>
            </div>
            <div className="shift-label text-primary">Shift 1</div>
            <div className="queue-number text-success mt-3">
              {shift1Queue === null ? (
                <h4>-</h4>
              ) : (
                <h4>{shift1Queue.antrian}</h4>
              )}
            </div>
            <div className="mt-3">Nomor Antrian Saat Ini</div>
            <div className="shift-time">06:30 - 08:30</div>
          </Card>
        </Col>

        {/* Shift 2 */}
        <Col md={4} className="mb-4">
          <Card className="text-center queue-card p-4">
            <div className="shift-icon">
              <i className="bi bi-clock-history"></i>
            </div>
            <div className="shift-label text-secondary">Shift 2</div>
            <div className="queue-number text-muted mt-3">
              {shift2Queue === null ? (
                <h4>-</h4>
              ) : (
                <h4>{shift2Queue.antrian}</h4>
              )}
            </div>
            <div className="mt-3">Nomor Antrian Saat Ini</div>
            <div className="shift-time">16:30 - 19:30</div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default QueueDisplay;
