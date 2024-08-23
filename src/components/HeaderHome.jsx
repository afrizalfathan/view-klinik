import Container from "react-bootstrap/esm/Container";

function HeaderHome() {
  return (
    <Container fluid className="background_jumbotron">
      <Container className="text-center pt-5">
        <div className="jumbotron p-5 ">
          <h1 className="mt-5">
            Selamat Datang di
            <br />
            <span>Klinik Sehat Bersama!</span>
          </h1>
          <p className="fs-5 mt-3">
            Kami berkomitmen untuk menyediakan pelayanan kesehatan terbaik
            <br />
            bagi Anda dan keluarga. Percayakan kesehatan Anda kepada kami.
          </p>
        </div>
      </Container>
    </Container>
  );
}

export default HeaderHome;
