import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      let res = await fetch(`http://localhost:3001/order/${id}`);
      res = await res.json();
      console.log("ressss", res);
      setOrder(res.data);
    })();
  }, []);

  return (
    <>
      {error ? (
        <div className="mt-24 text-center text-3xl font-bold text-red-500">
          {error}
        </div>
      ) : (
        <div className="mt-8 mb-24 container mx-auto">
          <p className="font-bold text-lg text-gray-600">Order Id: {id}</p>
          <div className="card mt-8 px-4 py-4 flex items-center justify-between">
            <p className="font-bold text-green-500">
              Your order has been placed successfully
            </p>
          </div>

          <div className="  flex items-center justify-between">
            <div className="card px-4 py-4">
              <p className="font-bold text-gray-600 text-lg">Order Summary</p>
              <p>
                Shipping Address: {order?.shippingAddress?.fullname},{" "}
                {order?.shippingAddress?.address},{" "}
                {order?.shippingAddress?.city},{" "}
                {order?.shippingAddress?.postalCode},{" "}
                {order?.shippingAddress?.country}
              </p>
              <p>Payment Method: {order?.paymentMethod}</p>
              <p className="mt-2">
                {order?.isPaid ? (
                  <span className="text-green-500 bg-green-100 px-4 py-1 rounded font-bold">
                    Payment Done
                  </span>
                ) : (
                  <span className="text-red-600 font-bold bg-red-50 px-4 py-1 rounded">
                    Not Paid
                  </span>
                )}
              </p>

              <div className=" px-4 py-4 mt-4">
                <table className="table-auto border-separate border-spacing-4 px-4 py-4">
                  {" "}
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orderItems?.map((e, idx) => (
                      <tr key={idx} className="text-center">
                        <td>
                          {" "}
                          <div className="flex items-center">
                            <img width={40} height={40} src={e?.thumbnail} />
                            <p className="ml-1">{e.name}</p>
                          </div>
                        </td>
                        <td>{e?.quantity}</td>
                        <td>${e?.price}</td>
                        <td>${e?.quantity * e?.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card px-4 py-4">
              <h2 className="font-bold text-gray-600 text-lg">
                Price Breakdown
              </h2>
              <p className="py-2">Items Total: ${order?.itemsPrice}</p>
              <p className="py-2">Shipping Charges: ${order?.shippingPrice}</p>
              <p className="py-2">Tax: ${order?.taxAmount}</p>

              <p className="py-2">Total Amount: ${order?.totalPrice}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderDetails;
