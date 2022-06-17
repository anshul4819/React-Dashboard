import React from "react";
import "./Profile.css";
import { useState } from "react";
import Navigationbar from './Navbar';
import Sidebar from './Sidebar';

function Profile() {

    const [name,setName] = useState("");
    const [age, setAge] = useState("");
    const [DOB,setDOB] = useState("");
    const [height,setHeight]= useState("");
    const [disease,setDisease]= useState("");
    const [message, setMessage] = useState("");
    let handleSubmit = async (e) => {
        console.log("Hello");
        e.preventDefault();
        try {
          let res = await fetch("https://localhost:9443/upload/metadata", {
            method: "POST",
            body: JSON.stringify({
              name: name,
              age: age,
              DOB: DOB,
              height: height,
              disease: disease,
            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setName("");
            setAge("");
            setMessage("User created successfully");
          } else {
            setMessage("Some error occured");
          }
        } catch(err) {
            console.log(err);
        }
    };


    return(
        <>
            {/* name,age, past disease, height, address,  */}
            <Navigationbar/>
            <Sidebar/>
            <div className = "form-box">
                
                <form onSubmit={handleSubmit}>
                    
                    <div className = "field1">
                        <label> <h1>Customer Info</h1> </label>
                        <input 
                            type="text" 
                            value={name}
                            placeholder="Name"
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            value={age}
                            placeholder="Age"
                            onChange={(e)=>setAge(e.target.value)}
                        />
                        <input 
                            type="text" 
                            value={DOB}
                            placeholder="Date of Birth"
                            onChange={(e)=>setDOB(e.target.value)}
                        />

                        <input 
                            type="text" 
                            value={height}
                            placeholder="Height (in cm)"
                            onChange={(e)=>setHeight(e.target.value)}
                        />
                        <input 
                            type="text"    
                            value={disease} 
                            placeholder="Previous Disease (if any)"
                            onChange={(e)=>setDisease(e.target.value)}
                        />
                    </div>

                    <button type = "submit" className = "submitBtn"> submit</button>
                    <div className="message">{message ? <p>{message}</p> : null}</div>
                </form>
            </div>
        </>

    );     
}   
export default Profile;