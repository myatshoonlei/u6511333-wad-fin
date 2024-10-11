export default function CustomerDetail({ name, membernumber, dateofbirth, interests }) {
    return (
      <div className="flex items-center justify-center h-screen overflow-hidden"> {/* Flexbox centering and fixed height */}
        <div className="p-6 w-full max-w-3xl border rounded-lg bg-white shadow-lg"> {/* Set width and max-width */}
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          <div className="mb-4">
            <strong>Member Number:</strong> {membernumber}
          </div>
          <div className="mb-4">
            <strong>Date of Birth:</strong> {new Date(dateofbirth).toLocaleDateString()}
          </div>
          <div className="mb-4">
            <strong>Interests:</strong> {interests || "No interests available"}
          </div>
        </div>
      </div>
    );
  }
  