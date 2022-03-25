import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Food_Menu = (props) => {

    const [vendor_id, setVendor_Id] = useState(localStorage.getItem("id"));
    const [item_name, setItem_Name] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState(0);
    const [veg, setVeg] = useState(true);
    const [add_on, setAdd_On] = useState([]);
    const [tags, setTags] = useState([]);
    
    // will store temp tags in it
    const [temp, setTemp] = useState("");

    // will store name and price in it
    const [temp2_name, setTemp2_Name] = useState("");
    const [temp2_price, setTemp2_Price] = useState(0);

    const [show_add_food, setShow_Add_Food] = useState(false);

    const [foods_array, setFood_Array] = useState([]);

    let Navigate = useNavigate();

    // onChangeVendor_Email = (e) => {
    //     setVendor_Email(e.target.value);
    // }
    
    const onChangeItem_Name = (e) => {
        setItem_Name(e.target.value);
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

    // const onChangeRating = (e) => {
    //     setRating(e.target.value);
    // } 
    // seller can't change rating.

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

    const reset_Input = () => {
        setItem_Name("");
        setPrice(0);
        setRating(0);
        setVeg(true);
        setAdd_On([]);
        setTags([]);
    }

    // below function is for adding food in the database
    const onSubmit_Food = e => {
        e.preventDefault();
        
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
            .post("/backend/foods/add", newFood)
            .then((response) => {
                alert("Created\t" + response.data.item_name);
                console.log(response.data);
                setFood_Array(old_foods_array => [...old_foods_array, response.data]);
              })
              .catch(err => {
                alert("Please try another email id , although it's not possible to get this error so you are probably dreaming");
                console.log(err);
              })

        reset_Input();
        setShow_Add_Food(false);
    }

    useEffect( () => {

        if(vendor_id == null) {
            alert("Please Login First , I am damn smarter then you :)");
            Navigate("/");
        };

        const temp_vendor_id = vendor_id;

        const api_vendor_id = {
            vendor_id: temp_vendor_id
        };

        axios
            .post("/backend/foods/particular", api_vendor_id)
            .then(res => {setFood_Array(res.data);})
            .catch(err => {console.log(err);})
    },[]);

    const Add_Food = () => {
       return(
        <div>
    
          <h3>Add Food -</h3>

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
                <option value="1">true</option>
                <option value="0">false</option>
              </select>
            </Grid>           
            <Grid item xs={12}>
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

            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Tags"
                    variant="outlined"
                    value={temp}
                    onChange={onChangeTemp}
                    />
                <Button variant="contained" onClick={addTags}>
                    Add Tag
                </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={onSubmit_Food}>
                Add Food
              </Button>
            </Grid>

          </Grid>
          <br />

        </div>
       )
    }

    const Delete_Food = (food_id) => {

        console.log(food_id);

        axios 
            .delete("/backend/foods/delete/" + food_id)
            .then(() => {alert("Deleted!");})
            .catch(err => {console.log(err);})
        
        setFood_Array(foods_array.filter(element => element._id !== food_id));
    }

    const Food_Row = (props) => {
        
        return(
          <tr>
            <td>{props.food.item_name}</td>
            <td>{props.food.price}</td>
            <td>{props.food.rating}</td>
            <td>{String(props.food.veg)}</td>

            <td>
                {props.food.add_on.map((current_object,i) => {
                    return <li key={i}>{current_object.food_add_on} for ₹{current_object.price}</li>
                })}
            </td>

            <td>
                {props.food.tags.map((current_tag,i) => {
                    return <li key={i}>{current_tag}</li>
                })}
            </td>
                
            <td>
                <Button variant="contained" onClick= { () => Delete_Food(props.food._id)}>
                  Delete
                </Button>
            </td>

            <td>
             <Button variant="contained" onClick= { () => Navigate("/profile/edit/" + props.food._id)}>
                Edit
             </Button>
            </td>
          </tr>
        )
    }

    const FoodList = () => {
        return foods_array.map( current_food => {
            return <Food_Row food={current_food} key={current_food._id}/>
        })
    }

    return(
        <div>
          <br />
          this is Food Menu.

          <Grid item xs={12} align="center">
              
            <Button variant="contained" onClick={() => setShow_Add_Food(true)}>
              Add Food
            </Button>
            {show_add_food==true && Add_Food()}
          </Grid>

          <h3>List of Food Item You on Store</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Veg</th>
                  <th>Add On's</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                { FoodList() }
              </tbody>
            </table>

        </div>
    )
}

export default Food_Menu;