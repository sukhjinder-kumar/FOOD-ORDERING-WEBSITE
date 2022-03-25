import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Order_Dashboard= (props) => {

    const [vendor_id, setVendor_Id] = useState(localStorage.getItem("id"));
    const [status, setStatus] = useState("");

    const [order_array, setOrder_Array] = useState([]);
    const Status_Array = ["PLACED","ACCEPTED","COOKING","READY FOR PICKUP","COMPLETED","REJECTED"];

    let Navigate = useNavigate();

    const onChangeStatus = (key,order_status) => {

        var j = -1;
        for(var i = 0; i < 6; i++) {
            if(order_status == Status_Array[i]) {
                j = i;
            }
        }

        var num_Accepted = 0;
        var num_Cooking = 0;
        order_array.map(current_order => {
            if(current_order.status == "ACCEPTED") {
                num_Accepted += 1;
            }
        });
        order_array.map(current_order => {
            if(current_order.status == "COOKING") {
                num_Cooking += 1;
            }
        });
        var total_pending = num_Accepted + num_Cooking;

        if( (j == 0 && total_pending < 10) || (j > 0 && j < 3) ) {

            order_status = Status_Array[j+1];

            const status_ = {
                status: order_status,
            };

            axios 
                .post("/backend/orders/update_vendor/" + key, status_)
                .then( () => {console.log("Status updated");})
                .catch(err => {console.log(err);})

            window.location.reload();
        }
        else {
            alert("Your pending orders > 10 , Please don't be Greedy");
        }
    }

    const onChangeStatus_ToReject = (key) => {

        const status_ = {
            status: "REJECTED",
        };

        axios 
            .post("/backend/orders/update_vendor/" + key, status_)
            .then( () => {console.log("Status updated");})
            .catch(err => {console.log(err);})

        window.location.reload();
    }

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

    },[])

    const Order_Row = (props) => {
    
        return(
            <tr>
              <td>{props.order.item_name}</td>
              <td>{props.order.quantity}</td>
              <td>{props.order.cost}</td>
              <td>{props.order.rating}</td>
              <td>{props.order.updatedAt.substring(0,10)} {props.order.updatedAt.substring(11,19)}</td>
              
              <td>
                {props.order.add_on.map((current_object,i) => {
                    return <li key={i}>{current_object.food_add_on} for ₹{current_object.price}</li>
                })}
              </td>
              
              <td>{props.order.status}</td>
    
              {props.order.status != "REJECTED" &&  props.order.status != "READY FOR PICKUP" && props.order.status != "COMPLETED" &&
              <td>
                <Button variant="contained" onClick= { () => onChangeStatus(props.order._id,props.order.status)}>
                    Next Status
                </Button>
              </td>}

              {props.order.status=="PLACED" &&
              <td> 
                <Button variant="contained" onClick= { () => onChangeStatus_ToReject(props.order._id)}>
                    Reject
                </Button>
              </td>}

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
                  <th>Cost</th>
                  <th>Rating</th>
                  <th>Placed at</th>
                  <th>Add On's</th>
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

export default Order_Dashboard;