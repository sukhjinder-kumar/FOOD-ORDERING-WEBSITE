import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile_number, setMobile_number] = useState("");

  useEffect(() => {
    localStorage.clear();
    setName("Dass TAs");
  }, []);

  return <div style={{ textAlign: "center" }}>Happy Coding - {name}</div>;
};

export default Home;
