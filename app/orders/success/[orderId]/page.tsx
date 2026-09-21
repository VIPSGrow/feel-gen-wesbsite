import { notFound } from "next/navigation";
import Link from "next/link";
import serverCallFuction from "@/lib/constantFunction";
import { APIResponse } from "@/lib/types/User";

interface Props {
  params: Promise<{ orderId: string }>;
}

// Function name capitalized: OrderSuccessPage
async function OrderSuccessPage({ params }: Props) {
  const { orderId } = await params;

  let orderData;
  try {
    const url = `api/orders/details/${orderId}`;
    orderData = (await serverCallFuction("GET", url)) as APIResponse;
    // console.log can be removed in production
    console.log("Order details response:", orderData);
  } catch (error) {
    console.error("Failed to fetch order:", error);
    notFound();
  }

  if (!orderData?.success || !orderData.data) {
    notFound();
  }

  const order = orderData.data;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="alert alert-success mb-5 animate__animated animate__fadeIn">
              <i className="bi bi-check-circle-fill display-4 d-block mb-3"></i>
              <h2>Order Placed Successfully!</h2>
              <p className="lead">Thank you for your purchase.</p>
              <h4>
                Order ID: <strong>{order?.order_id}</strong>
              </h4>
            </div>

            <div className="card text-start shadow-sm">
              <div className="card-header bg-white text-center py-3">
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <strong className="d-block mb-2 text-muted text-uppercase small">
                      Items
                    </strong>
                    <ul className="list-unstyled mt-2">
                      {(order.items as any[])?.map((item: any, idx: number) => (
                        <li
                          key={idx}
                          className="mb-2 border-bottom pb-2 d-flex justify-content-between align-items-center"
                        >
                          <span>
                            {item.product_name}
                            {item.variant_sku && (
                              <small className="text-muted d-block">
                                SKU: {item.variant_sku}
                              </small>
                            )}
                          </span>
                          <span className="badge bg-light text-dark border">
                            {item.price} × {item.qty}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-6 bg-light p-3 rounded">
                    <strong className="d-block mb-2 text-muted text-uppercase small">
                      Billing Details
                    </strong>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <span>₹{Number(order.sub_total || 0).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Tax:</span>
                      <span>₹{Number(order.tax_amount || 0).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Shipping:</span>
                      <span>
                        ₹{Number(order.shipping_charges || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between border-top pt-2 mt-2">
                      <strong className="h5">Total:</strong>
                      <strong className="h5 text-primary">
                        ₹{Number(order.total_amount || 0).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong className="d-block mb-2 text-muted text-uppercase small">
                      Shipping Address
                    </strong>
                    <p className="mb-0 fw-bold">
                      {order.shipping_address?.address_line1}, {order.shipping_address?.address_line2},

                      {order.shipping_address?.city},{" "}
                      {order.shipping_address?.state} -{" "}
                      {order.shipping_address?.pincode}
                    </p>
                    <p className="mb-0 small text-muted">
                      📞 {order.shipping_address?.phone}
                    </p>
                  </div>
                  <div className="col-md-6 text-md-end">
                    <strong className="d-block mb-2 text-muted text-uppercase small">
                      Payment Info
                    </strong>
                    <p className="mb-1">
                      Method:{" "}
                      <span className="badge border  bg-primary">
                        {order.payment_method?.toUpperCase()}
                      </span>
                    </p>
                    <p className="mb-0">
                      Status:{" "}
                      <span className="badge bg-success">{order?.order_status?.toUpperCase()}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <Link
                href="/account/orders"
                className="btn btn-primary px-4 py-2 me-3"
              >
                My Orders
              </Link>
              <Link
                href="/products"
                className="btn btn-outline-secondary px-4 py-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSuccessPage;
