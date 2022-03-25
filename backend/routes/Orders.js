const router = require("express").Router();
const Orders = require("../models/Orders.model");
const Buyers = require("../models/Buyers.model");
const Foods = require("../models/Foods.model");

router.get("/", (req,res) => {
    Orders.find()
        .then(order => res.json(order))
        .catch(err => res.status(400).json("Error: " + err))
})

router.get("/particular_buyer/:id", (req,res) => {

    const buyer_id = {
        buyer_id: req.params.id,
    }

    Orders.find(buyer_id)
        .then(order => res.json(order))
        .catch(err => res.status(400).json("Error: " + err))
})

router.get("/particular_vendor/:id", (req,res) => {

    const vendor_id = {
        vendor_id: req.params.id,
    }

    Orders.find(vendor_id)
        .then(order => res.json(order))
        .catch(err => res.status(400).json("Error: " + err))
})

// take care only add those items that you know are in foods database , its not linked to that.
router.post("/add", (req,res) => {
    
    const newOrder = new Orders({
        item_name: req.body.item_name,
        quantity: req.body.quantity,
        cost: req.body.cost,
        rating: req.body.rating,
        vendor_id: req.body.vendor_id,
        buyer_id: req.body.buyer_id,
        food_id: req.body.food_id,
        status: req.body.status,
        add_on: req.body.add_on,
    })

    Buyers.findById(newOrder.buyer_id) 
        .then(buyer => {

            let total_cost = newOrder.cost;
            for(let i = 0; newOrder.add_on[i] != null; i++) {
                total_cost = total_cost + newOrder.add_on[i].price;
            }
            total_cost = total_cost * newOrder.quantity;

            if(buyer.wallet >= total_cost) {
                newOrder.save()
                    .then((updated_order) => {
                        // res.json("Order Placed!");
                        let remain = buyer.wallet - total_cost;
                        buyer.wallet = remain;
                        buyer.save() 
                            .then(() => res.json("Order Placed! and buyer money subtracted :)"))
                            .catch(err => {return res.status(400).json("Error: " + err);})
                    })
                    .catch(err => {return res.status(400).json("Error: " + err);})
            }
            else {
                res.json("Your Wallet don't have enought money in it")
            }
        })
        .catch(err => {return res.status(400).json("Error: " + err);})
})

router.post("/cancel/:id", (req,res) => {
    
    Orders.findById(req.params.id)
        .then(order => {
            
            if(order.status == "PLACED") {
                Orders.findByIdAndDelete(req.params.id)
                    .then(() => {
                        Buyers.findById(order.buyer_id) 
                            .then(buyer => {

                                let total_cost = order.cost;
                                for(let i = 0; order.add_on[i] != null; i++) {
                                    total_cost = total_cost + order.add_on[i].price;
                                }
                                total_cost = total_cost * order.quantity;

                                buyer.wallet += total_cost;

                                buyer.save()
                                    .then(() => res.json("order has been cancelled! and money refunded"))
                                    .catch(err => res.status(400).json("Error: " + err))
                            })
                            .catch(err => res.status(400).json("Error: " + err))
                    })
                    .catch(err => res.status(400).json("Error: " + err))
            }
            else {
                res.json("Order cannot be cancelled now it's already phase next to PLACED , please contact vendor");
            }
        })
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/update_buyer/:id", (req,res) => {

    Orders.findById(req.params.id)
        .then(order => {

            order.status = req.body.status;

            if(order.status == "COMPLETED") {
                order.save()
                    .then(() => res.json("order completed! please shop again"))
                    .catch(err => {return res.status(400).json("Error: " + err);})
            
            }

            if(order.status == "PLACED") {

                Buyers.findById(order.buyer_id) 
                    .then(buyer => {

                        var total_cost = order.cost;
                        for(let i = 0; order.add_on[i] != null; i++) {
                            total_cost = total_cost + order.add_on[i].price;
                        }
                        total_cost = total_cost * order.quantity;

                        var remain = buyer.wallet + total_cost;
                        buyer.wallet = remain;

                        order.item_name = req.body.item_name;
                        order.quantity = req.body.quantity;
                        order.cost = req.body.cost;
                        order.add_on = req.body.add_on;
                        order.vendor_id = req.body.vendor_id;
                        // order place timing is original only or maybe different....depending on timestamps.

                        var total_cost2 = order.cost;
                        for(let i = 0; order.add_on[i] != null; i++) {
                            total_cost2 = total_cost2 + order.add_on[i].price;
                        }
                        total_cost2 = total_cost2 * order.quantity;

                        if(buyer.wallet >= total_cost2) {
                            var remain2 = buyer.wallet - total_cost2;
                            buyer.wallet = remain2;

                            buyer.save()
                                .catch(err => {return res.status(400).json("Error: " + err);})

                            order.save()
                                .then(() => res.json("Order has been updated and wallet has been changed accordingly"))
                                .catch(err => {return res.status(400).json("Error: " + err);})
                        }
                        else {
                            res.json("not enough money in wallet");
                        }
                    })
                    .catch(err => {return res.status(400).json("Error: " + err);})
            }

            if(order.status != "PLACED" && order.status != "COMPLETED") {
                res.json("Order is placed now , please contact vendor for modification of order")
            }

        })
        .catch(err => {return res.status(400).json("Error: " + err);})
})

router.post("/update_vendor/:id", (req,res) => {

    Orders.findById(req.params.id)
        .then(order => {
            order.status = req.body.status;

            if(order.status == "REJECTED") {
                Buyers.findById(order.buyer_id) 
                    .then(buyer => {

                        let total_cost = order.cost;
                        for(let i = 0; order.add_on[i] != null; i++) {
                            total_cost = total_cost + order.add_on[i].price;
                        }
                        total_cost = total_cost * order.quantity;

                        buyer.wallet += total_cost;

                        buyer.save()
                            .catch(err => res.status(400).json("Error: " + err))
                    })
                    .catch(err => res.status(400).json("Error: " + err))
            }

            order.save() 
                .then( () => res.json("Status of order has been updated and if rejected money refunded"))
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
})

router.delete("/delete/:id", (req,res) => {

    Orders.findByIdAndDelete(req.params.id)
        .then( () => res.json("Deleted Order"))
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/give_rating/:id", (req,res) => {

    Orders.findById(req.params.id)
        .then(order => {
            order.rating = req.body.rating;

            order.save()
                .catch(err => {return res.status(400).json("Error in saving order: " + err)})

            Foods.findById(order.food_id) 
                .then(food => {
                    food.rating = (food.rating * food.number_user + order.rating * order.quantity) / (food.number_user + order.quantity);
                    food.number_user += order.quantity;

                    food.save()
                        .then(() => res.json("food rating saved."))
                        .catch(err => {return res.status(400).json("Error in food rating one: " + err)})
                })
                .catch(err => {return res.status(400).json("Error in finding food: " + err)})

        })
        .catch(err => {return res.status(400).json("Error in finding order: " + err)})
})

module.exports = router;