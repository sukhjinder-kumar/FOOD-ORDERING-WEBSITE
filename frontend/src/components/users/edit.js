import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

const Edit = (props) => {

    const [vendor_id, setVendor_Id] = useState(localStorage.getItem("id"));
    const [item_name, setItem_Name] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [veg, setVeg] = useState(true);
    const [add_on, setAdd_On] = useState([]);
    const [tags, setTags] = useState([]);

    const [temp, setTemp] = useState("");
    const [temp2, setTemp2] = useState("");
    const [temp2_name, setTemp2_Name] = useState("");
    const [temp2_price, setTemp2_Price] = useState(0);

    let Navigate = useNavigate();

    const food_id = useParams();

    const onChangeItem_Name = (e) => {
        setItem_Name(e.target.value);
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

    const onChangeVeg = (e) => {
        setVeg(e.target.value);
    }

    const onChangeTemp = (e) => {
        setTemp(e.target.value);
    }

    const addTags = () => {
        tags.push(temp);
        setTemp("");
    }

    const ResetTags = () => {
        setTags([]);
    }
    
    const onChangeTemp2_Name = (e) => {
        setTemp2_Name(e.target.value);
    }

    const onChangeTemp2_Price = (e) => {
        setTemp2_Price(e.target.value);
    }

    const add_Add_On = () => {
        const temp_add_on = {
            food_add_on: temp2_name,
            price: temp2_price
        }
        add_on.push(temp_add_on);
        setTemp2_Name("");
        setTemp2_Price(0);
    }

    const Reset_Add_On = () => {
        setAdd_On([]);
    }

    const onChangeCurrentTag = (e,i) => {
        tags[i] = e.target.value;
    }

    useEffect( () => {  

        axios 
            .get("/backend/foods/" + food_id.id)
            .then(res => {
                setItem_Name(res.data.item_name);
                setPrice(res.data.price);
                setRating(res.data.rating);
                setVeg(res.data.veg);
                setVendor_Id(res.data.vendor_id);
                setAdd_On(res.data.add_on);
                setTags(res.data.tags);
            })
            .catch(err => {console.log(err);})
        console.log(price);
        console.log(veg);
    },[]);

    const onUpdate_Food = () => {

        const newFood = {
            vendor_id: vendor_id,
            item_name: item_name,
            price: price,
            rating: rating,
            veg: veg,
            add_on: add_on,
            tags: tags
        }

        axios 
            .post("/backend/foods/update/" + food_id.id, newFood)
            .then(res => {alert("Updated! " + item_name);})
            .catch(err => {console.log(err);})

        Navigate("/profile/food_menu");
        window.location.reload(); // for some reason useeffect in foodmenu is not getting triggered.
        // alert("Updated! " + item_name);
        
}

    return(
        <div>
          You are on Edit Page

          <h3>Edit -- </h3>
            
          <Grid container align={"center"} spacing={2}>

            <Grid item xs={12}>
                <TextField
                label="Item_Name"
                variant="outlined"
                value={item_name}
                onChange={onChangeItem_Name}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                label="Price"
                variant="outlined"
                value={price}
                onChange={onChangePrice}
                />
            </Grid>
            <Grid item xs={12}>
              <label>Is_Veg</label>
              <select 
                required
                className="form-control"
                value={veg}
                onChange={onChangeVeg}>
                {veg==true && <>
                <option value="1">true</option>
                <option value="0">false</option></>}
                {veg==false && <>
                <option value="0">false</option>
                <option value="1">true</option></>}
              </select>
            </Grid> 

            <Grid item xs={12}>
                {add_on.map( (current_object,i) => {
                    return <li key={i}>{current_object.food_add_on} for ₹{current_object.price}</li>
                })}
                <TextField
                label="Add_On_Name"
                variant="outlined"
                value={temp2_name}
                onChange={onChangeTemp2_Name}
                />
                <TextField
                label="Add_On_Price"
                variant="outlined"
                value={temp2_price}
                onChange={onChangeTemp2_Price}
                />
                <Button variant="contained" onClick={add_Add_On}>
                    Add Add_On
                </Button>
                <Button variant="contained" onClick={Reset_Add_On}>
                    Reset Add_On
                </Button>

            </Grid>

            <Grid item xs={12}>
                {tags.map( (current_tag,i) => {
                    return <li key={i}>{current_tag}</li>
                })}
                <TextField
                    label="Tags"
                    variant="outlined"
                    value={temp}
                    onChange={onChangeTemp}
                    />
                <Button variant="contained" onClick={addTags}>
                    Add Tag
                </Button>
                <Button variant="contained" onClick={ResetTags}>
                    Reset Tag
                </Button>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" onClick={onUpdate_Food}>
                Update Food
              </Button>
            </Grid>

          </Grid>
        </div>
    )
}

export default Edit;
