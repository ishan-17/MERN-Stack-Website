import axios from "axios";


export const getAllProducts = async () => {
  try {
    const products = await axios.get("https://fakestoreapi.com/products");
    return products.data
  } catch (error) {
    console.log("Error in fetch products from external api", error)
  }
};


export const getAllCategories = async () => {
    try {
        const categories = await axios.get("https://fakestoreapi.com/products/categories")
        return categories
    } catch (error) {
        console.log("error in fetching categories", error)
    }
}

export const getProductsByCategory = async (category) => {
    try {
        const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
        return res.data
    } catch (error) {
        console.log("Error in fetching product by category", error)

    }
}


export const getProductById = async (id) => {
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return res.data
  } catch (error) {
    console.log("Error in fetching product by Id", error)
  }
}
