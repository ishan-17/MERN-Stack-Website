import React, { useContext, useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/20/solid";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const paymentModes = [

  {
    name: "Cash On Delivery",
  },
];

const PaymentScreen = ({ selectedIndex, setSelectedIndex }) => {
  const { state, dispatch } = useContext(ShoppingCartContext);
  const { cart } = state;
  const { paymentMethod } = cart;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

  useEffect(() => {
    const index = paymentModes.findIndex((e) => e.name === paymentMethod.name);
    console.log("index", index);

    setSelectedPaymentMethod(paymentModes[index]);
  }, [paymentMethod]);

  const savePaymentMethod = () => {
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="mt-12">
      <h2 className=" text-gray-600 text-lg">Payment Screen</h2>

      <div className="w-full px-4 py-16">
        <div className="mx-auto w-full max-w-md">
          <RadioGroup
            value={selectedPaymentMethod}
            onChange={setSelectedPaymentMethod}
          >
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {paymentModes.map((e) => (
                <RadioGroup.Option
                  key={e.name}
                  value={e}
                  className={({ active, checked }) =>
                    `${
                      active
                        ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-primary-300"
                        : ""
                    }
                  ${checked ? "bg-gray-900  text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label
                              as="p"
                              className={`font-medium  ${
                                checked ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {e.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className={`inline ${
                                checked ? "text-sky-100" : "text-gray-500"
                              }`}
                            ></RadioGroup.Description>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            {/* <CheckIcon className="h-6 w-6" /> */}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <button onClick={savePaymentMethod} className="btn bg-gray-900  text-white font-bold py-2 px-4 rounded mt-8">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
