const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
        },

        items: [
            {
            type: Array,
            required: true,
            },
        ],

        phone_number: {
            type: String,
            required: true
        },
        
        user_id: {
            type: String,
            required: true
        },

        sub_total: {
            type: Number,
            required: true
        }
        
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;