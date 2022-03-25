const router = require("express").Router();
const Foods = require("../models/Foods.model");

router.get("/", (req,res) => {
    Foods.find()
        .then(food => res.json(food))
        .catch(err => res.status(400).json("Error: " + err));
})

router.post("/particular", (req,res) => {
    Foods.find(req.body)
        .then(food => res.json(food))
        .catch(err => res.status(400).json("Error: " + err));
})

router.get("/:id", (req,res) => {
    Foods.findById(req.params.id)
        .then(food => res.json(food))
        .catch(err => res.status(400).json("Error: " + err))
}) 

router.post("/add", (req,res) => {

    const newFood = new Foods({
        vendor_id: req.body.vendor_id,
        item_name: req.body.item_name,
        price: req.body.price,
        rating: req.body.rating,
        veg: req.body.veg,
        add_on: req.body.add_on,
        tags: req.body.tags
    })

    newFood.save() 
        .then(food => res.json(food))
        .catch(err => res.status(400).json("Error: " + err))
})

router.delete("/delete/:id", (req,res) => {

    Foods.findByIdAndDelete(req.params.id)
        .then(() => res.json("Food Deleted!"))
        .catch(err => res.status(400).json("Error: " + err))
})

router.post("/update/:id", (req,res) => {
    
    Foods.findById(req.params.id)
        .then(food => {
            // food.vendor_id = req.body.vendor_id;
            food.item_name = req.body.item_name;
            food.price = req.body.price;
            food.rating = req.body.rating;
            food.veg = req.body.veg;
            food.add_on = req.body.add_on;
            food.tags = req.body.tags;

            food.save()
                .then(food => {
                    res.json(food);
                    console.log("Updated!");
                })
                .catch(err => res.status(400).json("Error: " + err))
        })
        .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router;