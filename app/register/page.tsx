"use client";

import { useState, ChangeEvent, ChangeEventHandler } from "react";
import Link from "next/link";

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
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <Link href="/" className="text-2xl text-center font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:text-indigo-600 transition-colors">
                🏠.
            </Link>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-slate-500">Create your account</h2>
            </div>
            
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <p className="font-bold text-slate-500">Name</p>
                        <div className="mt-2">
                        <input
                        type="text"
                        name="email"
                        value={form.name}
                        placeholder="Your Name"
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                        required
                       />
                        </div>
                    </div>

                    <div>
                        <p className="font-bold text-slate-500">Email address</p>
                        <div className="mt-2">
                        <input
                        type="email"
                        name="email"
                        value={form.email}
                        placeholder="Your Email"
                        onChange={handleChange}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                        required
                       />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-500">Password</p>
                        </div>
                        <div className="mt-2">
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            placeholder="Your Password"
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6    "
                            required
                        />
                        
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Register</button>
                    </div>
                    </form>
                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Already a User? 
                    <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300"> Login</a>
                    </p>
            </div>
        </div>

    );

    
}