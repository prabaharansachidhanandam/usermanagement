"use client";
import React from "react";
import { FormEvent } from "react";
import utils from "../../services/utils";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const data = JSON.stringify({ email: email });
    const encrypted = utils.encrypt(data);
    //console.log(encryptEmail);
    const apiResponse = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: encrypted }),
    });
    const res = await apiResponse.json();

    if (res.message == "ok") {
      router.push("/pages/otp");
    } else {
      alert("User name error!");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
