"use client";
import { EmailIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { useAuth } from "@/app/auth/auth-context";

export default function SigninWithPassword() {
  const { login } = useAuth();
  const [email, setEmail] = useState(
    process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
  );
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setOtpSent(true);
        alert("OTP sent to your email!");
      } else {
        const errorData = await res.json();
        alert(`Failed to send OTP: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred while sending the OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: parseInt(otp, 10) }),
      });

      if (res.ok) {
        alert("Login successful!");
        login();
        router.push("/profile"); // Redirect to profile page on successful login
      } else {
        const errorData = await res.json();
        alert(`Login failed: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <form onSubmit={handleLogin}>
  
      <InputGroup
        type="email"
        label="Email"
        className="mb-4 [&_input]:py-[15px]"
        placeholder="Enter your email"
        name="email"
        handleChange={(e) => setEmail(e.target.value)}
        value={email}
        icon={<EmailIcon />}
        disabled={otpSent}
      />

      {otpSent && (
        <InputGroup
          type="text"
          label="OTP"
          className="mb-5 [&_input]:py-[15px]"
          placeholder="Enter your OTP"
          name="otp"
          handleChange={(e) => setOtp(e.target.value)}
          value={otp}
        />
      )}

      <div className="mb-4.5">
        {!otpSent ? (
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
            )}
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
            )}
          </button>
        )}
      </div>
    </form>
  );
}
