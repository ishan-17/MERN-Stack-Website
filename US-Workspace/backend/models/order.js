const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            title: {type: String, required: true},
            brand: {type: String, required: true},
            quantity: {type: Number, required: true},
            category: {type: String, required: true},
            price: {type: String, required: true},
            thumbnail: {type: String, required: true}
        }
    ],

    shippingAddress: {
        fullname: {type: String, required: true},
        city: {type: String, required: true},
        country: {type: String, required: true},
        address: {type: String, required: true},
        postalCode: {type: String, required: true},
    },

    paymentMethod: {type: String, required: true},
    itemsPrice: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    shippingPrice: {type: Number, required: true},
    taxAmount: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
},

{
    timestamps: true
}

)


 const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
module.exports = Order