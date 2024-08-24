import Axios from "axios";
import React from "react";

async function sendEmailCreateKonsul({ e, email, details }) {
  e.preventDefault();

  const {
    id,
    nama,
    no_hp,
    jenis_kelamin,
    keluhan,
    alergi,
    alamat,
    usia,
    m_pembayaran,
  } = details;

  const message = `
    <p>Hai, terima kasih sudah mendaftar konsultasi di Klinik dr. Maemunah. Berikut adalah data kamu yang sudah dimasukan:</p>

    <table border="1" cellpadding="5" cellspacing="0">
      <tr>
        <th>ID Konsultasi</th><td>${id}</td>
      </tr>
      <tr>
        <th>Nama</th><td>${nama}</td>
      </tr>
      <tr>
        <th>Nomor HP</th><td>${no_hp}</td>
      </tr>
      <tr>
        <th>Jenis Kelamin</th><td>${jenis_kelamin}</td>
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
        <th>Usia</th><td>${usia}</td>
      </tr>
      <tr>
        <th>Metode Pembayaran</th><td>${m_pembayaran}</td>
      </tr>
    </table>
  `;

  try {
    await Axios.post("http://localhost:3000/email_routes/email_send", {
      from: "refleurflower@gmail.com",
      to: email,
      subject: "Detail Konsultasi Anda",
      message: message,
    });

    console.log(details);
    alert("Perubahan sudah terkirim ke email penerima");
  } catch (error) {
    console.log(error);
  }
}

export default sendEmailCreateKonsul;
