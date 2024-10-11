"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();
  const APIBASE = process.env.NEXT_PUBLIC_API_URL;

  const removeCustomer = async () => {
    const confirmed = confirm("Are you sure you want to delete this customer?");

    if (confirmed) {
      try {
        // Send the DELETE request to the correct API endpoint
        const res = await fetch(`${APIBASE}/api/customer/${id}`, {
          method: "DELETE", // Use DELETE method
        });

        if (!res.ok) {
          throw new Error("Failed to delete customer");
        }

        // Refresh the page or reroute as necessary after successful deletion
        router.refresh();
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <button onClick={removeCustomer} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
