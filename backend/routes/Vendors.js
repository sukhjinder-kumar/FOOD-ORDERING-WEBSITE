const router = require("express").Router();
const Vendors = require("../models/Vendors.model");

router.route("/").get((req,res) => {
    Vendors.find()
        .then(vendors => res.json(vendors))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route("/:id").get((req,res) => {
    Vendors.findById(req.params.id)
        .then(vendors => res.json(vendors))
        .catch(err => res.status(400).json("Error: " + err));
})


router.route("/register").post((req,res) => {

    const newVendor = new Vendors ({
        manager_name: req.body.manager_name,
        shop_name: req.body.shop_name,
        email: req.body.email,
        password: req.body.password,
        contact_number: req.body.contact_number,
        occupation: req.body.occupation,
        canteen_opening_time: req.body.canteen_opening_time,
        canteen_closing_time: req.body.canteen_closing_time
    });

    newVendor.save()
        .then(() => res.json(newVendor))
        .catch(err => res.status(400).json("Error: " + err));
}) 


router.route("/login").post((req,res) =>{

    //const email = req.body.email;

    // Vendors.findOne( ({email}) => {
    //     if(email !== null) {
    //         res.json(email);
    //         // return email;
    //     }
    //     else {
    //         res.json("email not found");
    //     }
    // })

    // Vendors.findOne({email}) 
    //     .then(email => {
    //         if(email !== null) {
    //             res.json(email);
    //         }
    //         else {
    //             res.json("email not found");
    //         }
    //     })
    //     .catch(err => {console.log(err);})

    const email = req.body.email;
    const pass = req.body.password;
    
    Vendors.findOne({email}) 

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
})

router.post("/profile", (req,res) => {
    const email = req.body.email;

    Vendors.findOne({email}) 
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
    Vendors.findById(req.params.id)
        .then(data => {
            data.manager_name = req.body.manager_name;
            data.shop_name = req.body.shop_name;
            data.email = req.body.email;
            data.password = req.body.password;
            data.age = req.body.age;
            data.canteen_opening_time = req.body.canteen_opening_time;
            data.canteen_closing_time = req.body.canteen_closing_time;
            data.contact_number = req.body.contact_number;

            data.save()
                .then(data => {
                    console.log("Vendor updated!");
                    res.json(data);
                })
                .catch(err => {console.log(err);})
        })
        .catch(err => {console.log(err);})
});

module.exports = router;