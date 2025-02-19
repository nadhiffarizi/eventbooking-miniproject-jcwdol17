"use client";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
    setError("");
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-gray-800 underline mb-4">
          Log in to Your Account
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email or Phone Number:
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-white border-2 border-[#fc9247] text-black p-2 rounded shadow-2xl w-full hover:bg-[#fc9247] transition duration-200">
            Log In
          </button>
          <a
            href="#"
            className="text-red-600 hover:underline mt-2 block text-center">
            Forget Password?
          </a>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
