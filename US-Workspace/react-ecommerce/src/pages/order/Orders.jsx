import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const userId = localStorage.getItem("mongo_id");
  console.log("xx", userId);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      let res = await fetch(`http://localhost:3001/order/list/${userId}`);
      res = await res.json();
      console.log("ress", res);
      if (res.data.length) {
        setOrders(res.data);
      }
    })();
  }, []);
  return (
    <>
      {orders.length && (
        <div className="mt-24">
          <table
            width={1200}
            className="table-auto text-center border-separate border-spacing-4 card px-4 py-4 mx-auto"
          >
            {" "}
            <thead>
              <tr>
                <th>Orders</th>
                <th>Order Date</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((e) => (
                <tr key={e._id}>
                  <td>
                    {" "}
                    <p className="ml-1 text-green-500">
                      <Link to={`/order-details/${e._id}`}>{e._id}</Link>
                    </p>
                  </td>
                  <td>{e?.order_date}</td>
                  <td>{e?.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!orders.length && (
        <div>
          <h2 className="text-center mt-8 font-bold">No orders found</h2>
        </div>
      )}
    </>
  );
};

export default Orders;
