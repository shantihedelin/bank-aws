"use client";

import { useState } from "react";

//? is the sign in button aligned?
//TODO: make sign-in button bigger
//TODO: change font on the whole app

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) => {
    console.log("clicked on sign in");

    // Send username and password to the server
    const data = { username, password };

    try {
      console.log("REACT_APP_API_URL:", process.env.NEXT_PUBLIC_API_URL);
      

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const responseData = await response.json();
      localStorage.setItem("token", responseData.oneTimePassword); // Lagra token i localstorage
      localStorage.setItem("loggedInUser", username);
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

    return (
      <main className="flex justify-center mt-6">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-16">Login</h1>
          <div className="flex flex-col items-center">
            <div className="flex justify-center items-center mb-2">
              <label htmlFor="email" className="mr-2 w-20 text-right">Email:</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-gray-300 border rounded p-2 flex-1"
              />
            </div>
            <div className="flex justify-center items-center mb-2">
              <label htmlFor="password" className="mr-2 w-20 text-right">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-300 border rounded p-2 flex-1"
              />
            </div>
            <input
              className="input-btn m-4"
              type="submit"
              value={"Sign in"}
              onClick={handleSignin}
            />
          </div>
        </div>
      </main>
    );
    
  
}

export default Login;
