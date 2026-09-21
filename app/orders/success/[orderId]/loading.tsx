export default function Loading() {
  return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading Order Details...</span>
      </div>
      <p className="mt-3">Fetching your order details, please wait...</p>
    </div>
  );
}