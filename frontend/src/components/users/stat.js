import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Stat = (props) => {

    const [vendor_id, setVendor_Id] = useState(localStorage.getItem("id"));
    const [order_array, setOrder_Array] = useState([]);
    const Status_Array = ["PLACED","ACCEPTED","COOKING","READY FOR PICKUP","COMPLETED","REJECTED"];

    let Navigate = useNavigate();

    useEffect( () => {

        if(vendor_id == null) {
            alert("Please Login First , I am damn smarter then you :)");
            Navigate("/");
        };

        axios
            .get("/backend/orders/particular_vendor/" + vendor_id)
            .then(response => {
                setOrder_Array(response.data);
            })
            .catch(err => {console.log(err);})

    },[]);

    const Stat = (Order_Array) => {

        // <------------------1.Top 5 most sold--------------------------->
    
        var counter = new Map();
        Order_Array.map(current_order => {
            counter.set(current_order.item_name,0);
        })
        
        order_array.map(current_order => {
            counter.set(current_order.item_name, counter.get(current_order.item_name) + current_order.quantity);
        })

        const counter_sorted = new Map([...counter.entries()].sort((a, b) => b[1] - a[1]));
        console.log(counter_sorted);

        let array_item_names = [];
        for(const item of counter_sorted.keys()) {
            array_item_names.push(item);
        }

        let array_item_names_5 = []
        for(var i = 0; i < 5 && i < array_item_names.length; i++) {
            array_item_names_5.push(array_item_names[i]);
        }
        
        // <--------------------2. Number of order in PLACED STATUS--------------->
        var num_PLACED = 0;
        var num_PLACED_quantity = 0;
        Order_Array.map(current_order => {
            if(current_order.status == "PLACED") {
                num_PLACED += 1;
                num_PLACED_quantity += current_order.quantity;
            }
        })

        // <--------------------3. Number of order in != PLACED and COMPLETED and REJECTED STATUS--------------->
        var num_pending = 0;
        var num_pending_quantity = 0
        Order_Array.map(current_order => {
            if(current_order.status != "PLACED" && current_order.status != "COMPLETED" && current_order.status != "REJECTED") {
                num_pending += 1;
                num_pending_quantity += current_order.quantity;
            }
        })

        // <--------------------4. Number of order in COMPLETED STATUS--------------->
        var num_COMPLETED = 0;
        var num_COMPLETED_quantity = 0;
        Order_Array.map(current_order => {
            if(current_order.status == "COMPLETED") {
                num_COMPLETED += 1;
                num_COMPLETED_quantity += current_order.quantity;
            }
        })

        return(
          <div>

              <br />
            This is Stat page 2.

            <h3>Top 5 order (in terms of quantity) sold - </h3>

            {array_item_names_5.map( (current_item_name,i) => {
                return <li key={i}>{current_item_name}</li>
            })}

            <br /><br />
            <h3>Number of order in PLACED status</h3>
            {num_PLACED} <br />
            in quantity - {num_PLACED_quantity}

            <br /><br />
            <h3>Number of orders in != PLACED and COMPLETED and REJECTED status</h3>
            {num_pending} <br />
            in quantity - {num_pending_quantity}

            <br /><br />
            <h3>Number of orders COMPLETED</h3>
            {num_COMPLETED} <br />
            in quantity - {num_COMPLETED_quantity}


          </div>
        )
    }


    return(
        <div>
            { Stat(order_array) }
        </div>
    )
}

export default Stat;