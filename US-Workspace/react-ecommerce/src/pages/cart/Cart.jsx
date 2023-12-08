import React, {useContext} from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(ShoppingCartContext);
  const user = localStorage.getItem("accessToken")

  // Total Amount
  const totalAmount = state?.cart.cartItems?.reduce((acc, e) => {
    acc = acc + e.quantity * e.price;
    return acc;
  }, 0);

  // Total Quantity
  const totalQuantity = state?.cart?.cartItems.reduce((acc, e) => {
    acc = acc + e.quantity;
    return acc;
  }, 0);

  // Remove item from cart
  const removeItemFromCart = (id) => {
    console.log("Innnnn", id)
    dispatch({ type: "REMOVE_CART_ITEM", payload: id });
  };

  // Update Cart Quantity
  const updateCartQuantity = (item, quantity) => {
    console.log("updated", item, quantity);
    dispatch({ type: "UPDATE_QUANTITY", payload: { ...item, quantity } });
  };
  return (
    <>
      <table
        width={800}
        className="table-auto border-separate border-spacing-2 border border-slate-400 m-auto mt-24 px-8 py-8"
      >
        <thead>
          <tr>
            <th className="border border-slate-300 bg-gray-100 px-4">Item</th>
            <th className="border border-slate-300 bg-gray-100 px-4">
              Quantity
            </th>
            <th className="border border-slate-300 bg-gray-100 px-4">Price</th>
            <th className="border border-slate-300 bg-gray-100 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {state?.cart?.cartItems?.map((e) => (
            <tr key={e.id}>
              <td>
                <div className="flex items-center">
                  <img
                    width={40}
                    height={40}
                    src={e.images[0]}
                  />
                  <span className="ml-2">{e.title}</span>
                </div>
              </td>
              <td className="text-center">
                {e?.quantity}
              </td>
              <td className="text-center">
                ${e.quantity * e.price}
              </td>
              <td className="text-center">
                <FaTrash onClick={() => removeItemFromCart(e._id)} className="mx-auto cursor-pointer" />
              </td>
            </tr>
          ))}
          <tr className="text-center font-bold">
            <td className="mt-2 text-gray-600">
              Total Amount: <span className="text-primary">${totalAmount}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="card w-1/2 px-8 py-8 mx-auto mt-12">
        <p className="text-primary font-bold">
          <span className="text-gray-600 font-bold">Subtotal: </span>$
          {totalAmount}
        </p>
        <p className="mt-4 text-primary font-bold">
          <span className="text-gray-600 font-bold">Total Items: </span>
          {totalQuantity}
        </p>
        {!user || !totalQuantity ? <button disabled className="btn bg-gray-900 mt-8 opacity-50  text-white font-bold py-2 px-4 rounded">Checkout</button>: <button onClick={() => navigate("/shipping")} className=" mt-8 btn bg-gray-900  text-white font-bold py-2 px-4 rounded">Checkout</button>}

        {/* {!totalQuantity || !user ? (
          <button disabled className="primary-button mt-8 opacity-50">
            Checkout
          </button>
        ) : (
          <button onClick={navigateToShipping} className="primary-button mt-8">
            Checkout
          </button>
        )} */}
        {!user && <p className="text-red-600 my-2">Please login to continue</p>}
      </div>
    </>
  );
};

export default Cart;
