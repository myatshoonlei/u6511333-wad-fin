import EditCustomerForm from "../../components/EditCustomerForm"; // Make sure this path is correct

const APIBASE = process.env.NEXT_PUBLIC_API_URL;
const getCustomerById = async (id) => {
  try {
    const res = await fetch(`${APIBASE}/api/customer/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch customer");
    }

    const customer = await res.json();
    console.log("Fetched customer:", customer); // Debugging log
    return {
      id: customer._id, // Ensure mapping `_id` to `id`
      name: customer.name,
      membernumber: customer.membernumber,
      dateofbirth: customer.dateofbirth,
      interests: customer.interests,
    };
  } catch (error) {
    console.log(error);
  }
};

export default async function EditCustomer({ params }) {
  const { id } = params;
  const customer = await getCustomerById(id);

  console.log("Customer details to pass to EditCustomerForm:", customer); // Debugging log

  if (!customer) return <div>Loading...</div>; // Handle case where customer data is not ready

  return <EditCustomerForm {...customer} />;
}
