import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Register = (props) => {

  const [list_occupation, setList_Occupation] = useState(["Vendor","Buyer"]);
  const [list_batch_name, setList_Batch_Name] = useState(["UG1","UG2","UG3","UG4","UG5"]);
  // no need of setList_Occupation function , for future reference.

  const [occupation, setOccupation] = useState("");
  const [name, setName] = useState("");
  // manager_name == name , for saving space
  const [shop_name , setShop_Name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact_number, setContact_number] = useState("");
  const [age, setAge] = useState(0);
  const [batch_name , setBatch_Name] = useState("");
  const [canteen_opening_time, setCanteen_Opening_Time] = useState("");
  const [canteen_closing_time, setCanteen_Closing_Time] = useState("");
  // const [date, setDate] = useState(null);

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
    setAge(Number(e.target.value));
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

  // const onChangeDate = date => {
  //   setDate(date)
  // };

  const resetInputs_Buyer = () => {
    setOccupation("");
    setName("");
    setEmail("");
    setPassword("");
    setContact_number("");
    setAge(0);
    setBatch_Name("");
    // setDate(null);
  };

  const resetInputs_Vendor = () => {
    setOccupation("");
    setName("");
    setShop_Name("");
    setEmail("");
    setPassword("");
    setContact_number("");
    //setAge(0);
    setCanteen_Opening_Time("");
    setCanteen_Closing_Time("");
    // setDate(null);
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
      wallet: 0,
    };

    axios
      .post("/backend/buyers/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.name);
        console.log(response.data);
      })
      .catch(err => {
        alert("Please try another email id");
        console.log(err);
      })

    resetInputs_Buyer();
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
      .post("/backend/vendors/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.manager_name);
        console.log(response.data);
      })
      .catch(err => {
        alert("Please try another email id");
        console.log(err);
      })

    resetInputs_Vendor();
  };

  const onSubmit_List = (e) => {
    e.preventDefault();
    onChangeOccupation(e.target.value);
  };

  const Buyer = () => {
    return(
      <div>
        here will be a form for buyer
  
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
              Register
            </Button>
          </Grid>
        </Grid>
        <br />

      </div>
    )
  }

  const Vendor = () => {
    return(
      <div> 
        here will be a form for vendor

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
              Register
            </Button>
          </Grid>
        </Grid>
        <br />
      </div>
    )
  }

  return(
    <div>
      <br />
      <h3>Create New User</h3>
      <form onSubmit={onSubmit_List}> 
        <div className="form-group">
          <label>Occupation: </label>
          <select 
            required
            className="form-control"
            value={occupation}
            onChange={onChangeOccupation}>
              {
                list_occupation.map(function(occupation_) {
                  return <option 
                    key={occupation_}
                    value={occupation_}>{occupation_}
                  </option>
                })
              }
          </select>
        </div>
      </form>

      {occupation === "Buyer" && 
      Buyer() }

      {occupation === "Vendor" &&
      Vendor()}

    </div>
  )
}
// above is if statement in sexiest say! , and that triple = to is for also checking format.

//   return (
//     <Grid container align={"center"} spacing={2}>
//       <Grid item xs={12}>
//         <TextField
//           label="Name"
//           variant="outlined"
//           value={name}
//           onChange={onChangeUsername}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Email"
//           variant="outlined"
//           value={email}
//           onChange={onChangeEmail}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Password"
//           variant="outlined"
//           value={password}
//           onChange={onChangePassword}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Mobile_number"
//           variant="outlined"
//           value={mobile_number}
//           onChange={onChangeMobile_number}
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <Button variant="contained" onClick={onSubmit}>
//           Register
//         </Button>
//       </Grid>
//     </Grid>
//   );
// };

export default Register;
