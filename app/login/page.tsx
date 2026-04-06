"use client";
import { useState,ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
        }
    };

    

    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <Link href="/" className="text-2xl text-center font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:text-indigo-600 transition-colors">
                🏠.
            </Link>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-slate-500">Sign in to your account</h2>
            </div>
            
            
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        {/* <label  className="block text-sm/6 font-medium text-gray-100">Password</label> */}
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
                        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
                    </div>
                    </form>
                    <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Not a User? 
                    <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300"> Create a User</a>
                    </p>
            </div>
        </div>








        // <div style={{ maxWidth: 400, margin: "50px auto" }}>
        //     <h2>Login</h2>
        //     <form onSubmit={handleSubmit}>
        //         <input
        //             type="email"
        //             name="email"
        //             value={form.email}
        //             placeholder="Your Email"
        //             onChange={handleChange}
        //             required
        //         />
        //         <br/><br/>
        //         <input
        //             type="password"
        //             name="password"
        //             value={form.password}
        //             placeholder="Your Password"
        //             onChange={handleChange}
        //             required
        //         />
        //         <br/><br/>
        //         <button type="submit">Login</button>

        //     </form>
        //     <div >
        //         <p>{message}</p>
        //     </div>
            
        // </div>
    );
}