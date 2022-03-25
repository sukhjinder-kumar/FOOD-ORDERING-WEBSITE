const router = require("express").Router();
const { Router } = require("express");
const Buyers = require("../models/Buyers.model");
const Favorite = require("../models/Favorite.model")

router.get("/", (req, res) => {
    Buyers.find((err, buyers) => {
		if (err) {
			console.log(err);
		} else {
			res.json(buyers);
		}
	})
});


router.post("/register", (req, res) => {

    const newBuyer = new Buyers({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contact_number: req.body.contact_number,
        age: req.body.age,
        batch_name: req.body.batch_name,
        occupation: req.body.occupation,
        wallet: req.body.wallet
    });

    newBuyer.save()
        .then(buyer => {
            res.status(200).json(buyer);

            // console.log(buyer._id);

            // const newfav = new Favorite({
            //     buyer_id: buyer._id,
            //     food_id: [],
            //     food_name: []
            // })

            // newfav.save()   
            //     .catch(err => res.json(err)) 

            // res.json(buyer)
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


router.post("/login", (req, res) => {

	// const email = req.body.email;
	
	// Buyers.findOne( (email) => {
    //     if(!email) {
    //         res.json(email);
    //         // return email;
    //     }
    //     else {
    //         res.json("email not found");
    //     }
    // })

    // Buyers.findOne({email}) 
    //     .then(email => res.json(email))
    //     .catch(err => {console.log(err);});
    // picks null as well

    // Buyers.findOne( ({email}) => {
    //     if(email !== null) {
    //         res.json(email);
    //     }
    //     else {
    //         res.json("email not found");
    //     }
    // })
    // doesn't work , gives some error

    // Buyers.findOne({email}) 
    //     .then(email => {
    //         if(email !== null) {
    //             res.json(email);
    //         }
    //         else {
    //             res.json("email not found");
    //         }
    //     })
    //     .catch(err => {console.log(err);})
    // it works finally! , but here as findone returns entire object , not only email but entire buyer is printed
    // but we want also password

    const email = req.body.email;
    const pass = req.body.password;
    
    Buyers.findOne({email}) 

        .then(data => {
            if(data != null) {
                if(data.password == pass) {
                    console.log("succesful login")
                    res.json(data);
                }
                else {
                    res.json(null);
                    console.log("password didn't match")
                }
            }
            else {
                res.json(null);
                console.log("email not found") 
            }
        })
        .catch(err => {console.log(err);})
});

router.post("/profile", (req,res) => {
    const email = req.body.email;

    Buyers.findOne({email}) 
        .then(data => {
            if(data != null) {
                res.json(data);
            }
            else {
                console.log("email not found");
            }
        })
        .catch(err => {console.log(err);})
});

router.post("/update/:id", (req,res) => {
    Buyers.findById(req.params.id)
        .then(data => {
            data.name = req.body.name;
            data.email = req.body.email;
            data.password = req.body.password;
            data.age = req.body.age;
            data.batch_name = req.body.batch_name;
            data.contact_number = req.body.contact_number;
            data.wallet = req.body.wallet;

            data.save()
                .then(data => {
                    console.log("Buyer updated!");
                    res.json(data);
                })
                .catch(err => {console.log(err);})
        })
        .catch(err => {console.log(err);})
});

module.exports = router;