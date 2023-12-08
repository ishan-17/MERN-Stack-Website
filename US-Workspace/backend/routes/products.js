const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Getting all
router.post("/seed-products", async (req, res) => {
  try {
    const { products } = req.body;
    for (let e of products) {
      const product = await Product.create(e);
      await product.save();
    }

    res.json("Products seed successfully");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({})
    res.json({message: "Products fetched successfully", data: products})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById({_id: id})
        if(!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        return res.json(product)
    } catch (error) {
        console.log("Error in fetching product detail", error)
        return res.status(500).json({message: error.message, status: error.status})
    }
})

router.post("/update-stock", async (req, res) => {
    try {
        const {orderedProducts} = req.body
        for(let e of orderedProducts) {
            const product = await Product.findById(e?._id)
            if(product) {
                console.log("Innn", product)
                product.stock = product.stock - e?.quantity
                await product.save()
            }
        }

        return res.status(200).json({message: "Products stock updated successfully"})

    } catch (error) {
        console.log("Error in fetching product detail", error)
        return res.status(500).json({message: error.message, status: error.status})
    }
})

module.exports = router;
