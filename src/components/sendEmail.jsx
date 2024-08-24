import Axios from "axios";
import React from "react";

async function sendEmail({ email, setOtpGenerator, e, subject }) {
  e.preventDefault();
  const otpRandom = Math.round(Math.random() * 999); // Membuat kode OTP acak
  setOtpGenerator(otpRandom); // Memperbarui state dengan OTP acak yang baru

  try {
    await Axios.post("http://localhost:3000/email_routes/email_send", {
      from: "refleurflower@gmail.com",
      to: email,
      subject,
      message: `Hai, kode otp kamu ${otpRandom}`, // Mengirim otpRandom dalam email
    });
    alert("Kode OTP sudah dikirim, silahkan cek email anda!");
  } catch (error) {
    console.log(error);
  }
}

export default sendEmail;
