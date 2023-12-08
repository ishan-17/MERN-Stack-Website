import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { Country, State, City } from "country-state-city";

const ShippingComponent = ({ selectedIndex, setSelectedIndex }) => {
  console.log(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([])
  const [countryCode, setCountryCode] = useState("")
  const [stateCode, setStateCode] = useState("")

  const { state, dispatch } = useContext(ShoppingCartContext);
  const { cart } = state;
  const { shippingAddress } = cart;

  useEffect(() => {
    setValue("fullname", shippingAddress.fullname);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
    console.log(State.getStateByCodeAndCountry(shippingAddress.state, shippingAddress.country))
     }, [shippingAddress]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: { ...data } });
    console.log("State in shipping component", state);
    setSelectedIndex(selectedIndex + 1);
  };

  // Country

  const handleCountry = (e) => {
    setCountryCode(e.target.value)
    const res = State.getStatesOfCountry(e.target.value);
    setStates(res);
  };

  // State

  const handleCountryStateChange = (e) => {
    setStateCode(e.target.value)
    console.log("xxxxx", e.target.value)
    const res = City.getCitiesOfState(countryCode, e.target.value)
    setCities(res)
  }

  return (
    <div className="mt-8">
      <h2 className="font-medium text-gray-600">Shipping Address</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 w-1/2 mx-auto">
          <label
            htmlFor="fullname"
            className="block text-gray-700 font-medium mb-2"
          >
            Full Name
          </label>
          <input
            {...register("fullname", { required: "Full Name is required" })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs">{errors.fullname?.message}</p>
        </div>

        <div className="mt-2 w-1/2 mx-auto">
          <label
            htmlFor="country"
            className="block text-gray-700 font-medium mb-2"
          >
            Country
          </label>
          <select
            {...register("country", {
              required: "Country is required",
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => handleCountry(e)}
          >
            {Country.getAllCountries().map((e) => (
              <option key={e.isoCode} value={e.isoCode}>
                {e.name}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs">{errors.country?.message}</p>
        </div>

        <div className="mt-2 w-1/2 mx-auto">
          <label
            htmlFor="state"
            className="block text-gray-700 font-medium mb-2"
          >
            State
          </label>
          <select
            {...register("state", {
              required: "State is required",
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => handleCountryStateChange(e)}
          >
            {states.map((e) => (
              <option key={e.isoCode} value={e.isoCode}>{e.name}</option>
            ))}
          </select>
          <p className="text-red-500 text-xs">{errors.state?.message}</p>
        </div>

        <div className="mt-2 w-1/2 mx-auto">
          <label
            htmlFor="postal"
            className="block text-gray-700 font-medium mb-2"
          >
            City
          </label>
          <select
            {...register("city", {
              required: "City is required",
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {
              cities.map(e => (
                <option key={e.isoCode} value={e.isoCode}>{e.name}</option>
              ))
            }
          </select>
          <p className="text-red-500 text-xs">{errors.country?.message}</p>
        </div>

        <div className="mt-2 w-1/2 mx-auto">
          <label
            htmlFor="address"
            className="block text-gray-700 font-medium mb-2"
          >
            Address
          </label>
          <input
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 4,
                message: "Address should contain min length of 4",
              },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs">{errors.address?.message}</p>
        </div>

    

        <div className="mt-2 w-1/2 mx-auto">
          <label
            htmlFor="postal"
            className="block text-gray-700 font-medium mb-2"
          >
            Postal Code
          </label>
          <input
            {...register("postalCode", {
              required: "Postal Code is required",
              minLength: {
                value: 3,
                message: "Postal Code should contain min length of 3",
              },
            })}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-red-500 text-xs">{errors.postalCode?.message}</p>
        </div>

        <div className="mt-6 w-1/2 mx-auto mb-20">
          <button type="submit" className="btn bg-gray-900  text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingComponent;