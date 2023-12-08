import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

const ProductCard = ({ product }) => {
  const { state, dispatch } = useContext(ShoppingCartContext);
  const navigate = useNavigate();
  const addItemToCart = () => {
    console.log("before adding", state?.cart);
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity: 1 } });
  };

  const productExist = () => {
    const isExist = state?.cart?.cartItems.find((e) => e._id === product._id);
    return isExist;
  };

  const checkStock = () => {
    const productInCart = state?.cart?.cartItems.find(
      (e) => e._id === product._id
    );
    return productInCart.quantity < product.stock;
  };

  const incrementProduct = async () => {
    const res = checkStock(product);
    if (res) {
      const existingProduct = productExist();
      existingProduct.quantity = existingProduct.quantity + 1;
      dispatch({ type: "CART_ADD_ITEM", payload: { ...existingProduct } });
    }
  };

  const decrementProduct = () => {
    const existingProduct = productExist();
    existingProduct.quantity = existingProduct.quantity - 1;
    dispatch({ type: "CART_ADD_ITEM", payload: { ...existingProduct } });
  };

  useEffect(() => {
    productExist();
  }, [state?.cart?.cartItems]);

  return (
    <div className="card flex flex-col items-center mb-16 justify-center">
      {/* <Link href={`/product/${item.attributes.slug}`} passHref> */}
      <div className=" bg-gray-400">
        <img
          className="cursor-pointer"
          src={product.thumbnail}
          width={320}
          height={250}
          style={{ maxHeight: 250 }}
          onClick={() => navigate(`/product/${product._id}`)}
        />
      </div>
      {/* </Link> */}
      {/* <Link href={`/product/${item.attributes.slug}`} passHref> */}
      <div>
        <h2 className="font-bold text-gray-500 mt-4 cursor-pointer"></h2>
        {/* </Link> */}
        <p className="text-sm text-gray-400 text-center">{product.title}</p>
        <p className="text-sm text-primary font-bold text-center">
          ${product?.price}
        </p>
        <div
          style={{ width: "fit-content" }}
          className="flex items-center justify-between mx-auto mb-4"
        >
          {productExist() && (
            <button
              onClick={decrementProduct}
              className=" bg-primary text-white py-2 px-2 rounded mt-4 bg-gray-900 mx-2 outline-none"
            >
              -
            </button>
          )}

          {!productExist() && (
            <button
              onClick={addItemToCart}
              className={`${product.stock === 0 &&
                "opacity-50 cursor-default"} px-2 py-2 mx-auto bg-gray-900 rounded text-white outline-none mt-2 hover:bg-primary-dark my-4`}
              disabled={product.stock === 0 ? true : false}
            >
              Add to cart
            </button>
          )}
          <h2 className="text-sm text-gray-400 text-center mt-4">
            {productExist()?.quantity}
          </h2>

          {productExist() && (
            <button
              onClick={incrementProduct}
              className={" bg-primary text-white py-2 px-2 rounded mt-4 bg-gray-900 mx-2 outline-none"}
              disabled={!incrementProduct && true}
            >
              +
            </button>
          )}
        </div>
        {product?.stock === 0 && (
          <h2 className=" text-red-500 font-semibold">Out of stock</h2>
        )}
        {product?.stock < 10 && product?.stock !== 0 && (
          <h2 className=" text-red-500 font-semibold">
            Hurry, Only last {product?.stock} pieces left!
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
