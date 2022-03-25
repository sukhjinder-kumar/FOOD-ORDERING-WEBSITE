import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Wallet = (props) => {

    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [occupation, setOccupation] = useState(localStorage.getItem("occupation"));
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [contact_number, setContact_number] = useState("");
    const [age, setAge] = useState(0);
    const [batch_name , setBatch_Name] = useState("");
    const [id , setId] = useState("");
    const [wallet, setWallet] = useState(0); 

    const onChangeWallet = (e) => {
        setWallet(e.target.value)
    }

    const Navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

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
                alert("Updated wallet of \t" + response.data.name);
                console.log(response.data);
            })
            .catch(err => {
                alert("Please try another email id");
                console.log(err);
            })
            // this error will never come
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
      // always in above loop.

    },[])


    return(
        <div>
            <br />
            <h3>Wallet -- </h3>

          <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
              <TextField
              label="Name"
              variant="outlined"
              value={wallet}
              onChange={onChangeWallet}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={onSubmit}>
                Update_fun_na
              </Button>
          </Grid>
          </Grid>

        </div>
    )
}

export default Wallet;