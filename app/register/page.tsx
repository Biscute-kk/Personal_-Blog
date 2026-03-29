"use client";

import { useState, ChangeEvent, ChangeEventHandler } from "react";

// Type for form state
type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function Register(){
    const [form,setForm]=useState<FormData>({
        name:"",
        email:"",
        password:""
    });

    const[message,setMessage]=useState<string>("");

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value,
        });
    }

    const handleSubmit=async (e:React.SyntheticEvent)=>{
        e.preventDefault();

        const res= await fetch("api/users",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(form),
        });
        const data = await res.json();

        if (!res.ok){
            setMessage(data.error);
        }else{
            setMessage("User created successfully.✅");
            //reset form
            setForm({name:"",email:"",password:""});
        }
    };
    return(
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    onChange={handleChange}
                    value={form.name }
                    required
                />
                <br/><br/>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                    required

                />
                <br/><br/>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    required

                />
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>

        </div>
    );

    
}