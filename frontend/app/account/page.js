"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

//TODO: make name available on page when logged in
//TODO: just make this page more alive and atractive

function Account() {
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchBalance = async (loggedInUser, token) => {
    if (!loggedInUser || !token) {
      console.log("You are not logged in");
      setIsLoggedIn(false);
      return;
    }

    try {
      setLoading(true);
      console.log(
        "REACT_APP_API_URL skapa konto:",
        process.env.NEXT_PUBLIC_API_URL
      );
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loggedInUser,
          token: token,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.statusText}`);
      }

      const { balance } = await response.json();
      setBalance(balance);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token");
    console.log("Logged in user:", loggedInUser);
    fetchBalance(loggedInUser, token);
  }, []);

  const handleTransfer = async () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const token = localStorage.getItem("token");
    if (!loggedInUser || !token) {
      console.error("User is not logged in or token is missing");
      return;
    }
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/me/accounts/transactions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: loggedInUser,
            token: token,
            amount: parseInt(input, 10),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to transfer money: ${response.statusText}`);
      }

      await fetchBalance(loggedInUser, token);
    } catch (error) {
      console.error("Error transferring money:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-8 pt-8 flex justify-center flex-col">
      {!isLoggedIn ? (
        <div className="">
          <p className="flex justify-center text-2xl text-center">
            Du behöver logga in för att få åtkomst till kontouppgifter.
          </p>
          <div className="flex justify-center">
            <Link
              className="flex justify-center text-lg no-underline border-solid border border-gray-400 rounded-3xl w-28 mt-6 bg-white text-black shadow-md"
              href={"/login"}
            >
              <p className="m-0 p-2">Sign in</p>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div>
            <p className="text-xl">Current balance: {balance} </p>
          </div>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-28"
          ></input>
          <button className="w-28 cursor-pointer" onClick={handleTransfer}>
            Transfer money
          </button>
          {loading && <p>Loading...</p>}
        </>
      )}
    </main>
  );
}

export default Account;
