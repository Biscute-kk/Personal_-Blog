"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton(){
    const router=useRouter();
    const handleLogout=async()=>{
        await fetch("api/logout",{method:"POST"});
        router.replace("/login");
    };
    return <button onClick={handleLogout} className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all shadow-sm" >Logout</button>

}