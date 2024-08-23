import Axios from "axios";
import React from "react";

async function sendEmailCreateKonsul({ e, email, details }) {
  e.preventDefault();

  const {
    Pasien,
    konsultasi_id,
    keluhan,
    alergi,
    alamat,
    m_pembayaran, // Ambil data obat dari details
  } = details[0];

  const { obat } = details;

  const obatHtml = obat
    .map(
      (obat, idx) => `
      <tr key="${idx}">
        <td>${obat.namaObat}</td>
        <td>${obat.dosis}</td>
        <td>Rp. ${obat.harga}</td>
      </tr>`
    )
    .join("");

  const totalHarga = obat.reduce(
    (total, obat) => total + parseInt(obat.harga),
    0
  );

  const message = `
    <p>Hai, terima kasih sudah mendaftar konsultasi di Klinik dr. Maemunah. Berikut adalah data kamu yang sudah dimasukan:</p>
    <table border="1" cellpadding="5" cellspacing="0">
      <tr>
        <th>ID Konsultasi</th><td>${konsultasi_id}</td>
      </tr>
      <tr>
        <th>Nama</th><td>${Pasien.nama}</td>
      </tr>
      <tr>
        <th>Nomor HP</th><td>${Pasien.no_hp}</td>
      </tr>
      <tr>
        <th>Jenis Kelamin</th><td>${Pasien.jenis_kelamin}</td>
      </tr>
      <tr>
        <th>Keluhan</th><td>${keluhan}</td>
      </tr>
      <tr>
        <th>Alergi</th><td>${alergi}</td>
      </tr>
      <tr>
        <th>Alamat</th><td>${alamat}</td>
      </tr>
      <tr>
        <th>Usia</th><td>${Pasien.usia}</td>
      </tr>
      <tr>
        <th>Metode Pembayaran</th><td>${m_pembayaran}</td>
      </tr>
    </table>
    <p>Dan berikut adalah data dari obat yang sudah kami masukan beserta total:</p>
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>Nama Obat</th>
          <th>Dosis</th>
          <th>Harga</th>
        </tr>
      </thead>
      <tbody>
        ${obatHtml}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2"><strong>Total Harga</strong></td>
          <td><strong>Rp. ${totalHarga}</strong></td>
        </tr>
      </tfoot>
    </table>
    <p>Tolong segera transfer dan upload bukti pembayaran mu ya, jika kamu memakai metode pembayaran transfer</p>
    <p>dan upload bukti pembayaran mu di halaman Cek Konsul dengan memasukan kode Konsultasi yang berdasarkan data di atas : </p>
    <p>Rekening (BCA) : xxxxxxxxxx</p>
    <p>Jika kamu memakai metode pembayaran COD tidak perlu untuk upload bukti pembayaran</p>
  `;

  try {
    await Axios.post("http://localhost:3000/email_routes/email_send", {
      from: "refleurflower@gmail.com",
      to: email,
      subject: "Detail Konsultasi Anda",
      message: message,
    });
    console.log(message);
    console.log(details);
    alert("Perubahan sudah terkirim ke email penerima");
  } catch (error) {
    console.log(error);
  }
}

export default sendEmailCreateKonsul;
