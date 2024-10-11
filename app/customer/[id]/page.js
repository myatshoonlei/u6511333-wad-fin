import CustomerDetail from "../../components/CustomerDetail"; // Make sure the path is correct

const getCustomerById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/customer/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch customer");
    }

    const customer = await res.json();
    return customer;
  } catch (error) {
    console.log(error);
  }
};

export default async function CustomerDetailPage({ params }) {
  const { id } = params;
  const customer = await getCustomerById(id);

  if (!customer) return <div>Loading...</div>;

  return <CustomerDetail {...customer} />;
}
