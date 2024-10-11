"use client";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useEffect, useState } from "react";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/customer", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch customers");
        }

        const data = await res.json();
        setCustomers(data); // Set customers to state
      } catch (error) {
        console.error("Error loading customers: ", error);
        setCustomers([]);
      } finally {
        setLoading(false); // Loading is done
      }
    };

    fetchCustomers();
  }, []); // Run this effect only once on component mount

  // Function to remove a customer from state
  const handleRemoveCustomer = (id) => {
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer._id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="font-bold text-2xl mb-4">Customer List</h2>

      {customers.length ? (
        customers.map((customer) => (
          <div
            key={customer._id}
            className="p-4 border border-slate-300 my-3 flex justify-between items-center rounded-lg"
          >
            <div className="flex-1">
              {/* Link to the customer detail page */}
              <Link href={`/customer/${customer._id}`}>
                <h2 className="font-bold text-2xl cursor-pointer hover:underline">{customer.name}</h2>
              </Link>
              <div>Member Number: {customer.membernumber}</div>
              <div>Interests: {customer.interests || "No interests available"}</div>
              <div>Date of Birth: {customer.dateofbirth || "No date of birth available"}</div>
            </div>

            <div className="flex items-center gap-4">
              {/* Remove button */}
              <RemoveBtn id={customer._id} onRemove={handleRemoveCustomer} />

              {/* Edit button */}
              <Link href={`/editCustomer/${customer._id}`}>
                <HiPencilAlt size={24} className="cursor-pointer text-black" />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div>No customers available</div>
      )}

      {/* Add Customer Button */}
      <div className="mt-6 text-center">
        <Link href="/addCustomer">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Add Customer
          </button>
        </Link>
      </div>
    </div>
  );
}