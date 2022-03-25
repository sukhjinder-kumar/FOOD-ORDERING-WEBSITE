import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = (props) => {

    const [list_occupation, setList_Occupation] = useState(["Vendor","Buyer"]);
    const [occupation, setOccupation] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const onChangeOccupation = e => {
        setOccupation(e.target.value)
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    
    const onSubmit_List = (e) => {
        e.preventDefault();
        onChangeOccupation(e.target.value);
    };

    const resetInputs = () => {
        setOccupation("");
        setEmail("");
        setPassword("");
    };

    const onLogin_Buyer = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        }

        axios
            .post("/backend/buyers/login/", user)
            .then((res) => {
                if(res.data != null) {
                    alert("Login successful\t" + res.data.name);
                    console.log(res.data);
                    localStorage.setItem("email", res.data.email);
                    localStorage.setItem("occupation", res.data.occupation);
                    localStorage.setItem("id", res.data._id);
                    navigate("/profile")
                }
                else {
                    alert("Login unsuccessful");
                    resetInputs();
                }
            })
            .catch(err => {console.log(err);})
    };

    const onLogin_Vendor = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        }

        axios
            .post("/backend/vendors/login/", user)
            .then((res) => {
                console.log(res.status)
                if(res.data != null) {
                    alert("Login successful\t" + res.data.manager_name);
                    console.log(res.data);
                    localStorage.setItem("email", res.data.email);
                    localStorage.setItem("occupation", res.data.occupation);
                    localStorage.setItem("id", res.data._id);
                    navigate("/profile")
                }
                else {
                    alert("Login unsuccessful");
                    resetInputs();
                }
            })
            .catch(err => {console.log(err);})
    };

    const Buyer = () => {
        return(
            <div>
            <br />
            <Grid container align={"center"} spacing={2}>
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
                <Button variant="contained" onClick={onLogin_Buyer}>
                    Login
                </Button>
                </Grid>
            </Grid>
            </div>
        )
    }

    const Vendor = () => {
        return(
            <div>
            <br />
            <Grid container align={"center"} spacing={2}>
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
                <Button variant="contained" onClick={onLogin_Vendor}>
                    Login
                </Button>
                </Grid>
            </Grid>
            </div>
        )
    }

    return(
        <div>
          <br />
          <h3>Login -- </h3>
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
            Buyer()}

            {occupation === "Vendor" &&
            Vendor()}

        </div>
    )
}

export default Login;