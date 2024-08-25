import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/Image";

function About() {
  return (
    <div>
      <Container
        fluid
        className="jumbotron-about"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Container className="layanan-kami-container">
          <h1 className="mb-3 text-center pt-5">Layanan Kami</h1>
          <hr className="hr-line" />
          <Row className="p-5 align-items-center">
            <Col md={6} className="about-left">
              <Image src="../assets/layanan.svg" width={"90%"} fluid />
            </Col>
            <Col md={6} className="about-right p-3">
              <hr />
              <h4>Apa saja sih layanan kami ?</h4>
              <hr />

              <div className="service-section">
                <h4>Konsultasi Online</h4>
                <p>
                  Kami menyediakan layanan konsultasi online yang memudahkan
                  Anda untuk berkonsultasi dengan dokter tanpa harus datang
                  langsung ke klinik. Cukup dari rumah, Anda dapat menghubungi
                  dokter kami melalui platform online. Setelah konsultasi, obat
                  yang diresepkan akan dikirim langsung ke alamat Anda. Untuk
                  pembayaran, Anda bisa memilih metode pembayaran yang nyaman
                  seperti Cash on Delivery (COD) atau transfer bank.
                </p>
              </div>
              <div className="service-section">
                <h4>Antrian 24 Jam</h4>
                <p>
                  Untuk memberikan kenyamanan maksimal, kami menawarkan layanan
                  pendaftaran antrian yang dapat diakses selama 24 jam. Anda
                  bisa mendaftar antrian melalui website kami kapan saja atau
                  datang langsung ke klinik kami. Dengan sistem antrian yang
                  fleksibel ini, Anda tidak perlu khawatir kehabisan slot untuk
                  mendapatkan pelayanan medis yang Anda butuhkan.
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="layanan-kami-container mt-5">
          <h1 className="mb-3 text-center pt-5">Tentang Kami</h1>
          <hr className="hr-line" />
          <Row className="p-5 align-items-center">
            <Col md={6} className="about-left">
              <div className="service-section">
                <hr />
                <h4>Kenalan dulu yuk!</h4>
                <hr />
                <p>
                  Klinik [Nama Klinik] adalah klinik swasta yang berlokasi di
                  Cirebon, siap memberikan pelayanan kesehatan dengan dukungan
                  tim medis profesional dan fasilitas yang memadai.
                </p>
                <p>
                  Kami menyediakan berbagai layanan kesehatan, mulai dari
                  konsultasi secara luring ataupun daring, dengan fokus pada
                  kenyamanan dan kebutuhan pasien. Kami berkomitmen untuk
                  memberikan perawatan yang holistik dan personal. Terima kasih
                  telah mempercayakan kesehatan Anda kepada kami.
                </p>
              </div>
            </Col>
            <Col md={6} className="about-right p-3">
              <Image src="../assets/tentang.svg" width={"90%"} fluid />
            </Col>
          </Row>
        </Container>

        <Container className="layanan-kami-container mt-5">
          <h1 className="mb-3 text-center pt-5">Kontak Kami</h1>
          <hr className="hr-line" />
          <Row className="p-5 align-items-center">
            <Col md={6} className="about-left">
              <div className="service-section">
                <h4>Hubungi Kami : xxxxxxxx </h4>
                <h4>Email : xxxxxxx </h4>
                <h4>Alamat :xxxxxxx </h4>
              </div>
            </Col>
            <Col md={6} className="about-right p-3">
              <Image src="../assets/contact.svg" width={"90%"} fluid />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default About;
