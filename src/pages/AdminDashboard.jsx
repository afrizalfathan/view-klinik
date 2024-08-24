import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const AdminDashboard = () => {
  const [totalQueues, setTotalQueues] = useState(0);
  const [shift1Queues, setShift1Queues] = useState(0);
  const [shift2Queues, setShift2Queues] = useState(0);

  useEffect(() => {
    // Fetch data from your backend
    const fetchQueueData = async () => {
      try {
        const totalResponse = await axios.get(
          "http://localhost:3000/queue/total_queues_today"
        );
        const shift1Response = await axios.get(
          "http://localhost:3000/queue/shift1_queues_today"
        );
        const shift2Response = await axios.get(
          "http://localhost:3000/queue/shift2_queues_today"
        );

        setTotalQueues(totalResponse.data);
        setShift1Queues(shift1Response.data);
        setShift2Queues(shift2Response.data);
      } catch (error) {
        console.error("Error fetching queue data:", error);
      }
    };

    fetchQueueData();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center my-4">
        <Col md={8}>
          <div className="dashboard-box welcome-box">
            <p>Halo, Selamat Datang Admin</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="dashboard-box total-queue-box">
            <p>Total Antrian Hari Ini: {totalQueues.length}</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={3}>
          <div className="dashboard-box shift-box">
            <p>Antrian Shift 1: {shift1Queues.length}</p>
          </div>
        </Col>
        <Col md={3}>
          <div className="dashboard-box shift-box">
            <p>Antrian Shift 2: {shift2Queues.length}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
