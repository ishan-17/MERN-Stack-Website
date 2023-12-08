import React, { useContext, useState, Fragment } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
// import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import axios from "axios";
import { Dna } from "react-loader-spinner";

const PlaceOrder = ({ setSelectedIndex, baseURL }) => {
  const navigate = useNavigate();
  const deliveryOptions = [
    {
      id: 1,
      name: "Normal Delivery",
      value: 1,
    },
    {
      id: 2,
      name: "Next Day Delivery",
      value: 2,
    },
  ];
  const [deliveryType, setDeliveryType] = useState(deliveryOptions[0]);
  const { state, dispatch } = useContext(ShoppingCartContext);
  const [isLoading, setLoader] = useState(false);

  const { cart } = state;
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const mongoUserId = localStorage.getItem("mongo_id");
  const navigateToShippingTab = () => {
    setSelectedIndex(0);
  };

  const navigateToPaymentTab = () => {
    setSelectedIndex(1);
  };

  const placeOrder = async () => {
    try {
      setLoader(true);
      const updateStockReq = cartItems.map((e) => {
        return { _id: e?._id, quantity: e?.quantity };
      });
      const res = await axios.post("http://localhost:3001/order/create-order", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: paymentMethod.name
          ? paymentMethod.name
          : "Cash On Delivery",
        itemsPrice: totalItemsAmount,
        shippingPrice: shippingCharges,
        totalPrice: totalAmount,
        taxAmount: taxAmount,
        userId: mongoUserId,
      });
      console.log("res", res);

      if (res.status === 201) {
        const stockRes = await axios.post(
          "http://localhost:3001/products/update-stock",
          { orderedProducts: updateStockReq }
        );
        console.log("res", state);
        setTimeout(() => {
          setLoader(false);
          navigate(`/order-details/${res.data.data._id}`);
          dispatch({ type: "RESET_CART", payload: {} });
        }, 5000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const totalItemsAmount = state?.cart.cartItems?.reduce((acc, e) => {
    acc = acc + e.quantity * e.price;
    return acc;
  }, 0);

  let shippingCharges = totalItemsAmount < 100 ? 15 : 0;
  shippingCharges =
    deliveryType.value === 1 ? shippingCharges : +shippingCharges + 50;
  const taxAmount = totalItemsAmount * 0.15;
  const totalAmount = totalItemsAmount + shippingCharges + taxAmount;

  return (
    <>
      {isLoading && (
        <div
        className="custom-spinner"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"

          />
          <p className="text-center">Please wait! Your order is being processed!</p>
        </div>
      )}
     {!isLoading && <div className="mt-8 mb-24">
        <h3 className="text-gray-600 text-lg font-medium mb-8">Place Order</h3>
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card px-4 py-4">
              <p className="font-bold">Shipping Address</p>
              <p className="mt-2">
                {shippingAddress.fullname}, {shippingAddress.address}{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </p>
              <button onClick={navigateToShippingTab} className="text-primary">
                Edit
              </button>
            </div>
            <div className="card px-4 py-4 mt-4">
              <p className="font-bold">Payment Method</p>
              <p className="mt-2">{paymentMethod.name}</p>
              <button onClick={navigateToPaymentTab} className="text-primary">
                Edit
              </button>
            </div>

            <div className="card px-4 py-4 mt-4">
              <table className="table-auto border-separate border-spacing-4 card px-4 py-4">
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
                  {state?.cart?.cartItems?.map((e) => (
                    <tr key={e.id} className="text-center">
                      <td>
                        {" "}
                        <div className="flex items-center">
                          <img width={40} height={40} src={e.thumbnail} />
                          <p className="ml-1">{e.title}</p>
                        </div>
                      </td>
                      <td>{e.quantity}</td>
                      <td>${e.price}</td>
                      <td>${e.quantity * e.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{ height: "fit-content" }}
            className="card px-4 py-4 mt-4"
          >
            <p className="font-bold">Order Summary</p>
            <div className="mt-8">
              <p className="text-gray-600">Items : ${totalItemsAmount}</p>
              <p className="mt-2">Shipping Charges: ${shippingCharges}</p>
              <p className="mt-2">Tax Amount: ${taxAmount}</p>
              <p className="mt-2">Total Amount: ${totalAmount}</p>
              <p className=" text-green-400">
                {totalItemsAmount >= 100 && deliveryType.value !== 2 ? (
                  "Congratulations, you are eligible for free shipping"
                ) : deliveryType.value === 2 ? (
                  "Express Delivery"
                ) : (
                  <span className=" text-red-400">
                    Add items worth ${100 - totalItemsAmount} for free shipping
                  </span>
                )}
              </p>

              <button
                onClick={placeOrder}
                className="bg-gray-900  text-white py-2 px-4 rounded-full mt-4"
              >
                Place Order
              </button>
            </div>
            <div className="mt-4 mb-2">
              <Listbox value={deliveryType} onChange={setDeliveryType}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{deliveryType.name}</span>
                    {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span> */}
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {deliveryOptions.map((e) => (
                        <Listbox.Option
                          key={e.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={e}
                        >
                          {({ deliveryType }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  deliveryType ? "font-medium" : "font-normal"
                                }`}
                              >
                                {e.name}
                              </span>
                              {/* {deliveryType ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null} */}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <p className="mt-4 text-green-600">
              {deliveryType.name === "Normal Delivery"
                ? "Will be delivered within 5-7 business days."
                : "Will be delivered until tomorrow"}
            </p>
          </div>
        </div>
      </div> }
    </>
  );
};

export default PlaceOrder;
