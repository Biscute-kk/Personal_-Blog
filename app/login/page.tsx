"use client";
import { useState,ChangeEvent } from "react";
import { useRouter } from "next/navigation";
type loginData={
    email:string;
    password:string;
};

export default function Login(){
    const router=useRouter();
    const [form,setForm]=useState<loginData>({
        email:"",
        password:""
    });
    const [message,setMessage]=useState<string>("");


    const handleChange= (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;

        setForm((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit= async (e:React.SyntheticEvent)=>{
        e.preventDefault();
        const res=await fetch("api/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(form),
        })
        const data = await res.json();

        if(!res.ok){
            setMessage(data.err);
        }else{    
            setMessage("Login successful✅");
            router.replace("/dashboard");
            // console.log(data.user); // later use this
        }
    };

    

    return(
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Your Email"
                    onChange={handleChange}
                    required
                />
                <br/><br/>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    placeholder="Your Password"
                    onChange={handleChange}
                    required
                />
                <br/><br/>
                <button type="submit">Login</button>

            </form>
            <div >
                <p>{message}</p>
            </div>
            
        </div>
    );
}