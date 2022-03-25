import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Fuse from 'fuse.js';



const Dashboard= (props) => {

    const [foods, setFoods] = useState([]);
    const [print_food, setPrint_Food] = useState([]);
    const [fav_food, setfav_food] = useState([]);

    const [sortedfoods, setSortedFoods] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [quantity, setQuantity] = useState(0);
    // const [temp, setTemp] = useState(0); // i
    const [addon, setaddon] = useState("");

    //const [Order_place, setOrder_Place] = useState([]);
    
    const buyer_id = localStorage.getItem("id");

    const fuse = new Fuse(foods, {
        keys: [
          'item_name'
        ]
    });

    const onChangeAddons = (e) => {
        setaddon(e.target.value);
    }

    const onChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    // const onChangeaddon = (addon_ , e) => {
    //     setaddon(add_on_[temp]);
    // }

    useEffect( () => {

        axios
            .get("/backend/foods/")
            .then((response) => {
                setFoods(response.data);
                setPrint_Food(response.data);
                setSortedFoods(response.data);
                setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("/backend//favorite/" + buyer_id) 
            .then(res => {
                setfav_food(res.data);
            })
            .catch(err => {console.log(err);})

    }, []);

    const sortChange = () => {

        let foodsTemp = foods;
        const flag = sortName;
        foodsTemp.sort((a, b) => {
        if (a.date != undefined && b.date != undefined) {
            return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
        } else {
            return 1;
        }
        });
        setFoods(foodsTemp);
        setSortName(!sortName);

    };

    const customFunction = (event) => {
        console.log(event.target.value);
        //setPrint_Food(foods.filter(ele => ele.item_name.includes(event.target.value)));
        setPrint_Food(foods.filter(ele => ele.item_name.toLowerCase().startsWith(event.target.value)));
    };

    const fuzzySearch = (e) => {
        var array = fuse.search(e.target.value);
        var result = e.target.value ? array.map(current => current.item) : foods;
        setPrint_Food(result);
    }

    const Buy_Food = (key) => {

        axios
            .get("/backend/foods/" + key)
            .then(res => {
                // setOrder_Place(res.data);
                // console.log(Order_place);
                // console.log(res.data);
                const order_ = {
                    item_name: res.data.item_name,
                    quantity: quantity,
                    cost: res.data.price,
                    rating: res.data.rating,
                    vendor_id: res.data.vendor_id,
                    buyer_id: buyer_id,
                    food_id: res.data._id,
                    status: "PLACED",
                    // add_on: res.data.add_on
                    add_on: addon
                };
                
                console.log(res.data);
                console.log(buyer_id);

                axios 
                    .post("/backend/orders/add", order_)
                    .then( res => {
                        alert(res.data);
                        // alert("Order Placed thankyou for shoping")
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))

    } 

    const FavFood = (food_id_ , food_name_) => {

        const fav = {
            food_id: food_id_,
            food_name: food_name_,
            buyer_id: buyer_id
        }

        axios 
            .post("/backend/favorite/add/" + buyer_id, fav) 
            .then(res => {
                console.log(res.data);
                alert("Added to favorite list");
            })
            .catch(err => {console.log(err);})
        
    }

    var vendor_name = (key) => {

        var name;

        axios 
            .get("/backend/vendors/" + key)
            .then(res => {
                console.log(res.data.manager_name);
                //setName(res.data.manager_name);
                name = res.data.manager_name.toString();
            })
            .catch(err => {console.log(err);})
            
            // console.log(name);
            return name
        }

  return (
    <div>

      <Grid container>

        {/* filter -> */}
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            <ListItem text>
              <h1>Filters</h1>
            </ListItem>
          </List>
        </Grid>
        
        {/* search at top.. */}
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={customFunction}
            />
          </List>
        </Grid>

        {/* fuzzy search */}
        <Grid item xs={12} md={9} lg={9}>
          <List component="nav" aria-label="mailbox folders">
            <TextField
              id="standard-basic"
              label="Fuzzy Search"
              fullWidth={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={fuzzySearch}
            />
          </List>
        </Grid>
      
      </Grid>

      <Grid container>
        
        {/* the things on left side of printing  */}
        <Grid item xs={12} md={3} lg={3}>
          <List component="nav" aria-label="mailbox folders">
            
            {/* show salary min and max .... */}
            <ListItem>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  Salary
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Min"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="standard-basic"
                    label="Enter Max"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </ListItem>
            
            <Divider />

              {/* select name at bottom has Autocomplete */}
            <ListItem divider>
              <Autocomplete
                id="combo-box-demo"
                options={foods}
                getOptionLabel={(option) => option.name}
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Names"
                    variant="outlined"
                  />
                )}
              />

            </ListItem>
          
          </List>
        </Grid>
        
        {/* main list printing */}
        <Grid item xs={12} md={9} lg={9}>
          <Paper>
            <Table size="small">

                {/* heading */}
              <TableHead>

                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  {/* <TableCell>
                    {" "}
                    <Button onClick={sortChange}>
                      {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    </Button>
                    Date
                  </TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Favorite</TableCell>
                  {/* <TableCell>Vendor Name</TableCell> */}
                  <TableCell>Rating</TableCell>
                  <TableCell>Veg</TableCell>
                  <TableCell>Add On</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Buy</TableCell>
                </TableRow>

              </TableHead>
              
              {/* body */}
              <TableBody>
                {print_food.map((food, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    {/* <TableCell>{food.createdAt.substring(0,10)}</TableCell> */}
                    <TableCell>{food.item_name}</TableCell>
                    <TableCell>{food.price}</TableCell>
                    {/* <TableCell>--vendor name</TableCell> */}
                    <TableCell>
                        <Button variant="contained" onClick= { () => FavFood(food._id,food.item_name)}>
                            Fav
                        </Button>
                    </TableCell>
                    {/* <TableCell>{vendor_name(food.vendor_id)}</TableCell> */}
                    <TableCell>{food.rating}</TableCell>
                    <TableCell>{String(food.veg)}</TableCell>

                    {/* <TableCell>{food.add_on.map( (current_addon,i) => {
                        return <li key={i}>{current_addon.food_add_on} for ₹{current_addon.price}</li>
                    })}</TableCell> */}

                    <Box sx={{ maxWidth: 500 }}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Addons</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addon}
                            label="Occupation"
                            onChange={onChangeAddons}
                          >
                            {food.add_on.map((current_object, i) => {
                            return <MenuItem value={current_object}>{current_object.food_add_on} for ₹{current_object.price}</MenuItem>
                            })}
                            
                          </Select>
                        </FormControl>
                    </Box>

                    {/* <Tab>
                        <label>Addon</label>
                        <select 
                            required
                            className="form-control"
                            value={temp}
                            onChange={onChangeaddon(food.add_on)}>
                            {food.add_on.map( (current_addon,i) => {
                                return <option value={i}>{current_addon.food_add_on} for ₹{current_addon.price}</option>
                            })}
                        </select>
                    </Tab */}
                        {/* {food.add_on.map( (current_addon,i) => {
                        return <li key={i}>{current_addon.food_add_on} for ₹{current_addon.price}</li>
                    })}</TableCell> */}

                    <TableCell>{food.tags.map( (current_tag,i) => {
                        return <li key={i}>{current_tag}</li>
                    })}</TableCell>

                    <TableCell>
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            value={quantity}
                            onChange={onChangeQuantity}
                            />
                    </TableCell>

                    <TableCell>
                      <Button variant="contained" onClick= { () => Buy_Food(food._id)}>
                        Buy
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            
            </Table>
          </Paper>
        </Grid>
      
      </Grid>
        
      <Grid container>
          <h3>Favorite</h3> 
                
            {fav_food.map( (current_food,i) => {
                return <ul key={i}>{current_food.food_name}</ul>
            })}
      </Grid>

    </div>
  );
}

export default Dashboard;