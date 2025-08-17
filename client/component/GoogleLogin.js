"use client";

import { useEffect } from "react";

export default function GoogleLoginButton() {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-btn"),
        {
          theme: "outline",
          size: "large",
        }
      );
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    const idToken = response.credential;

    // Send ID token to your Express backend
    const res = await fetch("http://localhost:4000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important to get/set cookies
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      // redirect or show success
      window.location.href = "/";
    } else {
      alert(data.message);
    }
  };

  return <div id="google-btn"></div>;
}
