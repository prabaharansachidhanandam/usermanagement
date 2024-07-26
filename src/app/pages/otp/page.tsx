"use client";
import React from "react";
import { FormEvent } from "react";
import utils from "../../services/utils";

const OTP = () => {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const otp = formData.get("otp") as string;
    const data = JSON.stringify({ otp: otp });
    const encrypted = utils.encrypt(data);
    //console.log(encryptEmail);
    const response = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: encrypted }),
    });

    const res = await response.json();

    if (res.message == "ok") {
      alert("OTP sucess!");
    } else {
      alert("OTP error!");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="otp" placeholder="otp" required />
      <button type="submit">OTP Validate</button>
    </form>
  );
};

export default OTP;
