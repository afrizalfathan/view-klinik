import { useState } from "react";
import Axios from "axios";
import FormConsult from "../components/FormConsult";
import { useNavigate } from "react-router-dom";
import sendEmail from "../components/sendEmail";
import sendEmailCreateKonsul from "../components/sendEmailCreateKonsul";
import React from "react";
import FindKonsul from "./FindKonsul";

function CreateConsult() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [jenis_kelamin, setJenis_kelamin] = useState("");
  const [keluhan, setKeluhan] = useState("");
  const [alergi, setAlergi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [usia, setUsia] = useState(0);
  const [otp, setOtp] = useState(0);
  const [otpGenerator, setOtpGenerator] = useState("");
  const [otpValidasi, setOtpValidasi] = useState(true);
  const [m_pembayaran, setM_pembayaran] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  function idKey() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const randomNumber = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");

    const result = `02_${day}_${month}_${year}_${randomNumber}`;
    return result;
  }

  const createConsultHandler = async (e) => {
    e.preventDefault();
    const idHandler = idKey();
    // if (parseInt(otp) === otpGenerator) {

    // } else {
    //   setOtpValidasi(false);
    // }

    try {
      const konsulCreateData = {
        id: idHandler,
        nama,
        no_hp,
        jenis_kelamin,
        keluhan,
        alergi,
        email,
        alamat,
        usia,
        m_pembayaran,
      };

      const response = await Axios.post(
        "https://server-klinik-production.up.railway.app/konsul/create_consult",
        konsulCreateData
      );

      console.log({
        id: idHandler,
        nama,
        no_hp,
        jenis_kelamin,
        keluhan,
        alergi,
        email,
        alamat,
        usia,
        m_pembayaran,
      });

      if (response.status === 201) {
        await sendEmailCreateKonsul({ e, email, details: konsulCreateData });
        navigate(`/konsul/details/${idHandler}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FindKonsul />
      <FormConsult
        setAlergi={setAlergi}
        alergi={alergi}
        setKeluhan={setKeluhan}
        keluhan={keluhan}
        setJenis_kelamin={setJenis_kelamin}
        jenis_kelamin={jenis_kelamin}
        setNama={setNama}
        nama={nama}
        setNo_hp={setNo_hp}
        no_hp={no_hp}
        setOtp={setOtp}
        otp={otp}
        setAlamat={setAlamat}
        alamat={alamat}
        setEmail={setEmail}
        createConsultHandler={createConsultHandler}
        sendEmail={sendEmail}
        setOtpGenerator={setOtpGenerator}
        setM_pembayaran={setM_pembayaran}
        m_pembayaran={m_pembayaran}
        setUsia={setUsia}
        email={email}
        usia={usia}
        setOtpValidasi={setOtpValidasi}
        otpValidasi={otpValidasi}
      />
    </>
  );
}

export default CreateConsult;
