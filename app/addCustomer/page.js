"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [membernumber, setMemberNumber] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");
  const [interests, setInterests] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send customer details in the request
      const res = await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, membernumber, dateofbirth, interests }), // Include customer fields
      });

      if (res.ok) {
        // Redirect to "/home" after successful customer creation
        router.push("/");
      } else {
        throw new Error("Failed to create customer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded">
      <label className="block mb-2 font-bold">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Customer Name"
        className="block w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2 font-bold">Member Number</label>
      <input
        type="number"
        value={membernumber}
        onChange={(e) => setMemberNumber(e.target.value)}
        placeholder="Member Number"
        className="block w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2 font-bold">Date of Birth</label>
      <input
        type="date"
        value={dateofbirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        className="block w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2 font-bold">Interests</label>
      <input
        type="text"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        placeholder="Interests"
        className="block w-full mb-4 p-2 border"
      />

      <button type="submit" className="bg-blue-600 text-white p-2 mt-4">
        Add Customer
      </button>
    </form>
  );
}
