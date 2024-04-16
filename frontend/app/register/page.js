"use client";

import { useState } from "react";

//TODO: align form
//TODO: header on register page & login page is different, make it same
//TODO: show message if user forgot to fill in the required fields
//TODO: animate the submit button, on hover-bg color lighter background
//? Varför blir inte inputfälten lika breda?
//? FIXME: require to accept terms and conditions + email & password

function Register() {
  //? A lot of state, maybe you can migrate it into one or two? if you want more
  //? inputfields on the page.... = more states.. yikes...
  //? maybe "[information, setInformation]" 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Samla in data från formuläret, generera ett id för varje användare
    const id = Date.now();
    const data = { id, username, password };

    try {

      const response = await fetch("http://ec2-16-16-194-81.eu-north-1.compute.amazonaws.com:3002/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("User created successfully!");
      } else {
        console.log("Failed to create user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="px-8 pt-8 flex flex-col justify-center items-center">
      <h2 className="text-3xl">Set up your account</h2>
      <div className="pt-4 m-6">
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <label htmlFor="email" className="w-34 text-right mr-2">
              Email*
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="example@example.com"
              required
              className="border-gray-300 border rounded p-2 flex-1"
            ></input>
          </div>
          <div className="flex items-center mb-6">
            <label htmlFor="password" className="w-34 text-right mr-2">
              Password*
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="*********"
              className="border-gray-300 border rounded p-2 flex-1"
            ></input>
          </div>
          <div className="flex items-center mb-6">
            <label htmlFor="name" className="w-34 text-right mr-2">
              Full name
            </label>
            <input
              type="name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Firstname Lastname"
              className="border-gray-300 border rounded p-2 flex-1"
            ></input>
          </div>
          <div className="flex items-center mb-6">
            <label className="w-16 text-right mr-2">Birth</label>
            <input
              type="date"
              className="cursor-pointer border-gray-300 border rounded p-2 flex-1"
            ></input>
          </div>
        </form>
        <div className="flex items-center flex-col ">
          <div className="flex items-center mt-16 ">
            <input className="hidden md:flex checkbox" type="checkbox" />
            <p className="mr-6 text-lg">Agree to Terms and Conditions</p>
            <label className="switch md:hidden">
              <input type="checkbox"></input>
              <span className="slider"></span>
            </label>
          </div>
          <input
            type="submit"
            value={"Submit"}
            onClick={handleSubmit}
            className="submit-btn"
          ></input>
        </div>
      </div>
    </main>
  );
}

export default Register;
