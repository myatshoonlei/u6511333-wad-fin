"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditCustomerForm({ id, name, membernumber, dateofbirth, interests }) {
  const [newName, setNewName] = useState(name || "");
  const [newMemberNumber, setNewMemberNumber] = useState(membernumber || "");
  const [newDateOfBirth, setNewDateOfBirth] = useState(dateofbirth || "");
  const [newInterests, setNewInterests] = useState(interests || "");

  const router = useRouter();
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;

  // Ensure state updates if the props change (for async data)
  useEffect(() => {
    setNewName(name || "");
    setNewMemberNumber(membernumber || "");
    setNewDateOfBirth(dateofbirth || "");
    setNewInterests(interests || "");
  }, [name, membernumber, dateofbirth, interests]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${APIBASE}/api/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          membernumber: newMemberNumber,
          dateofbirth: newDateOfBirth,
          interests: newInterests,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update customer details");
      }

      router.refresh();
      // Redirect to home after successful update
      router.push("/");
    } catch (error) {
      console.log("Error updating customer:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded">
      <label className="block mb-2 font-bold">Name</label>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Customer Name"
        className="block w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2 font-bold">Member Number</label>
      <input
        type="number"
        value={newMemberNumber}
        onChange={(e) => setNewMemberNumber(e.target.value)}
        placeholder="Member Number"
        className="block w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2 font-bold">Date of Birth</label>
      <input
        type="date"
        value={newDateOfBirth}
        onChange={(e) => setNewDateOfBirth(e.target.value)}
        className="block w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2 font-bold">Interests</label>
      <input
        type="text"
        value={newInterests}
        onChange={(e) => setNewInterests(e.target.value)}
        placeholder="Customer Interests"
        className="block w-full mb-4 p-2 border"
      />

      <button type="submit" className="bg-blue-600 text-white p-2 mt-4">
        Update Customer
      </button>
    </form>
  );
}
