import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Profile = (props) => {

  const Navigate = useNavigate();
  
  const [list_batch_name, setList_Batch_Name] = useState(["UG1","UG2","UG3","UG4","UG5"]);
  
  // const email = localStorage.getItem("email");
  // const occupation = localStorage.getItem("occupation");
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [occupation, setOccupation] = useState(localStorage.getItem("occupation"));
  const [shop_name , setShop_Name] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [age, setAge] = useState(0);
  const [batch_name , setBatch_Name] = useState("");
  const [canteen_opening_time, setCanteen_Opening_Time] = useState("");
  const [canteen_closing_time, setCanteen_Closing_Time] = useState("");
  const [id , setId] = useState("");
  const [wallet, setWallet] = useState(0); 
  
  const onChangeOccupation = e => {
    setOccupation(e.target.value);
  };

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeShop_Name = e => {
    setShop_Name(e.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeContact_Number = (event) => {
    setContact_number(event.target.value);
  };

  const onChangeAge = e => {
    setAge(e.target.value);
  }; 

  const onChangeBatch_Name = e => {
    setBatch_Name(e.target.value);
  };

  const onChangeCanteen_Opening_Time = e => {
    setCanteen_Opening_Time(e.target.value);
  };

  const onChangeCanteen_Closing_Time = e => {
    setCanteen_Closing_Time(e.target.value);
  };

  const onSubmit_Buyer = (event) => {
    event.preventDefault();

    const newUser = {
      // occupation: occupation, already we know it's buyer
      name: name,
      email: email,
      password: password,
      contact_number: contact_number,
      age: age,
      batch_name: batch_name,
      occupation: "Buyer",
      wallet: wallet,
    };

    axios
      .post("/backend/buyers/update/" + id, newUser)
      .then((response) => {
        alert("Updated\t" + response.data.name);
        console.log(response.data);
      })
      .catch(err => {
        alert("Please try another email id");
        console.log(err);
      })

    localStorage.clear();
    localStorage.setItem("email", email);
    localStorage.setItem("occupation", "Buyer");
  };

  const onSubmit_Vendor = (event) => {
    event.preventDefault();

    const newUser = {
      // occupation: occupation, already we know it's buyer
      manager_name: name,
      shop_name: shop_name,
      email: email,
      password: password,
      contact_number: contact_number,
      occupation: "Vendor",
      canteen_opening_time: canteen_opening_time,
      canteen_closing_time: canteen_closing_time
    };

    axios
      .post("/backend/vendors/update/" + id, newUser)
      .then((response) => {
        alert("Updated\t" + response.data.manager_name);
        console.log(response.data);
      })
      .catch(err => {
        alert("Please try another email id");
        console.log(err);
      })

    localStorage.clear();
    localStorage.setItem("email", email);
    localStorage.setItem("occupation", "Vendor");
  };

  useEffect( () => {
    
    if(email == null) {
      alert("Please Login First , I am damn smarter then you :)");
      Navigate("/");
    };

    const Email = {
      email: email
    }

    if(occupation == "Buyer") {
      axios
        .post("/backend/buyers/profile", Email)
        .then(res => {
          setName(res.data.name)
          setPassword(res.data.password)
          setContact_number(res.data.contact_number)
          setBatch_Name(res.data.batch_name)
          setAge(res.data.age)
          setId(res.data._id)
          setWallet(res.data.wallet)
        })
        .catch(err => {console.log(err);})
    }  
    
    if(occupation == "Vendor") {
      axios
        .post("/backend/vendors/profile", Email)
        .then(res => {
          setName(res.data.manager_name)
          setShop_Name(res.data.shop_name)
          setPassword(res.data.password)
          setContact_number(res.data.contact_number)
          setCanteen_Opening_Time(res.data.canteen_opening_time)
          setCanteen_Closing_Time(res.data.canteen_closing_time)
          setId(res.data._id)
        })
        .catch(err => {console.log(err);})
    }

  }, [])


  const Buyer_page = () => {
    return(
      <div>
        it's buyer info page

        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact_number"
              variant="outlined"
              value={contact_number}
              onChange={onChangeContact_Number}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="age"
              variant="outlined"
              value={age}
              onChange={onChangeAge}
            />
          </Grid>
          <Grid item xs={12}>
          <label>batch_name</label>
            <select 
              required
              className="form-control"
              value={batch_name}
              onChange={onChangeBatch_Name}>
                {
                  list_batch_name.map(function(batch_name_) {
                    return <option 
                      key={batch_name_}
                      value={batch_name_}>{batch_name_}
                    </option>
                  })
                }
            </select>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit_Buyer}>
              Update
            </Button>
          </Grid>
        </Grid>
        <br />
      </div>
    )
  }

  const Vendor_page = () => {
    return(
      <div>
        it's vendor info page

        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={onChangeUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="shop_name"
              variant="outlined"
              value={shop_name}
              onChange={onChangeShop_Name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={onChangePassword}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact_number"
              variant="outlined"
              value={contact_number}
              onChange={onChangeContact_Number}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="canteen_opening_time"
              variant="outlined"
              value={canteen_opening_time}
              onChange={onChangeCanteen_Opening_Time}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="canteen_closing_time"
              variant="outlined"
              value={canteen_closing_time}
              onChange={onChangeCanteen_Closing_Time}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit_Vendor}>
              Update
            </Button>
          </Grid>
        </Grid>
        <br />
      </div>
    )
  }

  return (
    <div>
      <br />
      <h3>Information -- </h3>

      {occupation == "Buyer" &&
      <Buyer_page />}

      {occupation == "Vendor" &&
      <Vendor_page />}

    </div>
  )
}

export default Profile;
