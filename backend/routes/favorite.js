const router = require("express").Router();
const { Router } = require("express");
const Favorite = require("../models/Favorite.model");

// for that particular buyer id
router.get("/:id", (req,res) => {

    const buyer_id_ = {
        buyer_id: req.params.id
    }

    Favorite.find( buyer_id_ )
        .then( fav => {
            console.log(fav);
            res.json(fav);
        })
        .catch(err => res.status(400).json("Error: " + err))
})

// add to buyer_id
router.post("/add/:id", (req,res) => {

    const newfav = new Favorite({
        buyer_id: req.params.id,
        food_id: req.body.food_id,
        food_name: req.body.food_name
    })

    newfav.save()  
        .then(fav => res.json(fav)) 
        .catch(err => res.json(err)) 



    // Favorite.find( {buyer_id_} ) 
    //     .then(fav => {
    //         var foodid = req.body.food_id;
    //         var foodname = req.body.food_name;

    //         fav.food_id.push(foodid);
    //         fav.food_name.push(foodname);

    //         fav.save()
    //             .then(fav2 => {
    //                 res.status(200).json(fav2);
    //             })
    //             .catch(err => {
    //                 res.status(400).send(err);
    //             });
    //     })
})

module.exports = router;