import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useRef} from 'react';
import { useThemeProps } from "@mui/material";


const My_Order= (props) => {

    const [buyer_id, setVendor_Id] = useState(localStorage.getItem("id"));
    const [status, setStatus] = useState("");

    const [order_array, setOrder_Array] = useState([]);
    const Status_Array = ["PLACED","ACCEPTED","COOKING","READY FOR PICKUP","COMPLETED","REJECTED"];

    // temp for storing rating
    const [temp, setTemp] = useState(0);

    const [name, setName] = useState("");
    // for disabling rating button after one use.
    // let btnRef = useRef(0);

    let Navigate = useNavigate();

    const onChangeTemp = (e) => {
        setTemp(e.target.value);
    }

    var vendor_name = (vendor_id_) => {

        axios 
            .get("/backend/vendors/" + vendor_id_)
            .then(res => {
                //console.log(res.data.manager_name);
                setName(res.data.manager_name);
            })
            .catch(err => {console.log(err);})
        
        // console.log(name);
       
        return name;
    }

    var total_cost = (order) => {

        var total_cost;
        total_cost = order.cost;
        order.add_on.map(current_addon => {
            total_cost += current_addon.price;
        })
        
        total_cost *= order.quantity;
        return total_cost;    
    }

    const MakeItComplete = (key) => {

        const status_ = {
            status: "COMPLETED",
        };

        axios 
            .post("/backend/orders/update_buyer/" + key, status_)
            .then( res => {
                console.log(res.data);
                console.log("Status updated");
            })
            .catch(err => {console.log(err);})

        window.location.reload();

        // return (
        //     <div>
        //         <Grid item xs={12}>
        //             <label>Rating</label>
        //             <select 
        //                 required
        //                 className="form-control"
        //                 value={temp}
        //                 onChange={onChangeTemp}>
        //                 <option value="0">0</option>
        //                 <option value="1">1</option>
        //                 <option value="2">2</option>
        //                 <option value="3">3</option>
        //                 <option value="4">4</option>
        //                 <option value="5">5</option>
        //             </select>
        //         </Grid>
        //         <Button variant="contained" onClick= { () => GiveRating(key)}>
        //             Give Rating
        //         </Button>
        //     </div>
        // )

        
    }

    const ToCancel = (key) => {

        axios 
            .post("/backend/orders/cancel/" + key)
            .then( res => {
                console.log(res);
                console.log("Status updated");
            })
            .catch(err => {console.log(err);})

        window.location.reload();
    }

    const GiveRating = (key) => {


        // if(btnRef.current){
        //     btnRef.current.setAttribute("disabled", "disabled");
        // }

        const rating_ = {
            rating: temp,
        }

        axios 
            .post("/backend/orders/give_rating/" + key, rating_)
            .then(res => {
                alert("Thanks for rating the food :)");
                console.log(res);
                console.log("thanks for rating");
            })
            .catch(err => {console.log(err);})
    }

    useEffect( () => {

        if(buyer_id == null) {
            alert("Please Login First , I am damn smarter then you :)");
            Navigate("/");
        };

        axios
            .get("/backend/orders/particular_buyer/" + buyer_id)
            .then(response => {
                setOrder_Array(response.data);
            })
            .catch(err => {console.log(err);})

    },[])

    const Order_Row = (props) => {
    
        return(
            <tr>
              <td>{props.order.item_name}</td>
              <td>{props.order.quantity}</td>
              <td>{total_cost(props.order)}</td>
              {/* <td>{props.order.rating}</td> */}
              
              <td>
                {props.order.add_on.map((current_object,i) => {
                    return <li key={i}>{current_object.food_add_on} for ₹{current_object.price}</li>
                })}
              </td>

              <td>{props.order.updatedAt.substring(0,10)} {props.order.updatedAt.substring(11,19)}</td>

              {/* <td>{vendor_name(props.order.vendor_id)}</td> */}
              {/* <td>vendor name</td> */}
              
              <td>{props.order.status}</td>
    
              {props.order.status == "READY FOR PICKUP" && 
              <td>
                <Button variant="contained" onClick= { () => MakeItComplete(props.order._id)}>
                   Pick Up
                </Button>
              </td>}

              {props.order.status=="PLACED" &&
              <td> 
                <Button variant="contained" onClick= { () => ToCancel(props.order._id)}>
                    Cancel
                </Button>
              </td>}

              {props.order.status == "COMPLETED" &&
              <td>
                <Grid item xs={12}>
                  <label>Rating</label>
                    <select 
                        required
                        className="form-control"
                        value={temp}
                        onChange={onChangeTemp}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </Grid>
                <Button variant="contained" onClick= { () => GiveRating(props.order._id)}>
                    Give Rating
                </Button>
              </td>}

              {/* we can add update order also */}

            </tr>
        )
    }

    const OrderList = (var1) => {
        return var1.map( current_order => {
            return <Order_Row order={current_order} key={current_order._id} />
        })
    }

    return(
        <div>
            <h3>this is Order Dashboard</h3>.

            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Total Cost</th>
                  {/* <th>Rating</th> */}
                  <th>Add On's</th>
                  <th>Placed Time</th>
                  {/* <th>Vendor Name</th> */}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {OrderList(order_array) }
              </tbody>
            </table>

        </div>
    )
}

export default My_Order;