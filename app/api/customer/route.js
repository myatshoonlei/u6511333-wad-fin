import Customer from "@/models/Customer";

export async function GET() {
    try {
        const customers = await Customer.find().sort({ name: 1 });
        return new Response(JSON.stringify(customers), { status: 200 });
    } catch (error) {
        return new Response('Error retrieving customers', { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const customer = new Customer(body);
        await customer.save();
        return new Response(JSON.stringify(customer), { status: 201 });
    } catch (error) {
        return new Response('Error creating customer', { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const customer = await Customer.findByIdAndUpdate(body._id, body, { new: true });
        if (!customer) {
            return new Response('Customer not found', { status: 404 });
        }
        return new Response(JSON.stringify(customer), { status: 200 });
    } catch (error) {
        return new Response('Error updating customer', { status: 500 });
    }
}
