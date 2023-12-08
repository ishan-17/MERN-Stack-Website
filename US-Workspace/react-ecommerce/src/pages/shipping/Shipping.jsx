import React, {useContext, useState} from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { Tab } from "@headlessui/react";
import ShippingComponent from "../../components/checkout/ShippingComponent";
import PaymentScreen from "../../components/checkout/PaymentScreen";
import PlaceOrder from "../../components/checkout/PlaceOrder";
import { Link } from "react-router-dom";


const Shipping = () => {
  const { state } = useContext(ShoppingCartContext);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const changeTab = (index) => {
    console.log("index", index);
    setSelectedIndex(index);
  };

  return (
    <>
      {state?.cart?.cartItems.length ? (
        <div className="mt-4 container mx-auto">
          <Tab.Group
            selectedIndex={selectedIndex}
            onChange={(index) => changeTab(index)}
          >
            <Tab.List className="flex items-center justify-between border-b-2 border-gray-900">
              <Tab
                className={`outline-none font-bold py-2 text-gray-600 ${
                  selectedIndex === 0 ? "text-gray-900" : ""
                }`}
              >
                Shipping Address
              </Tab>
              {selectedIndex < 1 ? (
                <Tab
                  disabled
                  className={`outline-none font-bold py-2 text-gray-600 ${
                    selectedIndex === 1 ? "text-gray-900" : ""
                  }`}
                >
                  Payment Method
                </Tab>
              ) : (
                <Tab
                  className={`outline-none font-bold py-2 text-gray-600 ${
                    selectedIndex === 1 ? "text-gray-900" : ""
                  }`}
                >
                  Payment Method
                </Tab>
              )}

              {selectedIndex < 2 ? (
                <Tab
                  disabled
                  className={`outline-none font-bold py-2 text-gray-600 ${
                    selectedIndex === 2 ? "text-gray-900" : ""
                  }`}
                >
                  Place Order
                </Tab>
              ) : (
                <Tab
                  className={`outline-none font-bold py-2 text-gray-600 ${
                    selectedIndex === 2 ? "text-gray-900" : ""
                  }`}
                >
                  Place Order
                </Tab>
              )}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                {
                  <ShippingComponent
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                }
              </Tab.Panel>
              <Tab.Panel>
                {
                  <PaymentScreen
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                }
              </Tab.Panel>
              <Tab.Panel>
                {
                  <PlaceOrder
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    // baseURL={baseURL}
                  />
                }
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      ) : (
        <div className="text-center mt-12">
          <img className="m-auto" width={400} height={400} src={"/empty-cart.png"} />
          <p className="text-lg text-gray-600 font-bold mt-4 mb-8">
            Your cart is Empty ! Add some items to cart and please come back.
          </p>
          <span className="btn bg-gray-900  text-white font-bold py-2 px-4 rounded">
            {" "}
            <Link href={"/"}>Go to shopping</Link>{" "}
          </span>
        </div>
      )}
    </>
  );
};

export default Shipping;
