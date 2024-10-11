import Customer from "@/models/Customer";
import mongoose from "mongoose";

// Helper function to connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export async function GET(request, { params }) {
  await connectDB(); // Ensure the DB is connected
  const id = params.id;

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response('Invalid customer ID format', { status: 400 });
  }

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return new Response('Customer not found', { status: 404 });
    }
    return new Response(JSON.stringify(customer), { status: 200 });
  } catch (error) {
    console.error("Error retrieving customer:", error);  // Log the error for debugging
    return new Response('Error retrieving customer', { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await connectDB(); // Ensure the DB is connected
  const id = params.id;

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response('Invalid customer ID format', { status: 400 });
  }

  try {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return new Response('Customer not found', { status: 404 });
    }
    return new Response(JSON.stringify(customer), { status: 200 });
  } catch (error) {
    console.error("Error deleting customer:", error);  // Log the error for debugging
    return new Response('Error deleting customer', { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB(); // Ensure the DB is connected
  const id = params.id;

  // Validate if the provided ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response('Invalid customer ID format', { status: 400 });
  }

  try {
    const body = await request.json();
    
    // Update the customer by its id using findByIdAndUpdate
    const updatedCustomer = await Customer.findByIdAndUpdate(id, body, { new: true });
    
    if (!updatedCustomer) {
      return new Response('Customer not found', { status: 404 });
    }
    
    return new Response(JSON.stringify(updatedCustomer), { status: 200 });
  } catch (error) {
    console.error("Error updating customer:", error);  // Log the error for debugging
    return new Response('Error updating customer', { status: 500 });
  }
}
