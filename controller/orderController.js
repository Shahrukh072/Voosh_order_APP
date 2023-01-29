const Order = require("../model/order")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class order {
    static async checkout(req, res, next) {
        try {
            const  user_id = req.user
            let sub_total = 0
            
            const userPhone = user_id.phone_number

            if ( userPhone == null || userPhone == undefined) {
                return res.status(501).json("this checkout cant be implemented, please update your profile to have the address and phone number")
            }

            await new Order({
                orderId: user_id._id,
                items: itemSummary,
                phone_number: userPhone,
                sub_total: sub_total,
                orderDate: Date.now(),
            }).save()
            
            return await res.status(201).json({
                phone_number: userPhone,
                sub_total: sub_total
            })
        } catch (error) {
            next(error)
        }
    }

    static async order(req, res, next) {
        const user_id = req.user
        const allUserOrder = await Order.find({
            orderId: user_id._id
        })
        return res.status(200).json(allUserOrder)
    }
}

module.exports = order