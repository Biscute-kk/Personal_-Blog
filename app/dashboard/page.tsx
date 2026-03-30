
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "../components/logout";
// import { useRouter } from "next/navigation";
export default async function Dashboard(){
    const cookieStore= await cookies();
    const user=cookieStore.get("user");

    // const router=useRouter();
    // const handleLogout= async()=>{
    //     await fetch("api/logout", {method:"POST"});
    //     router.push("/login");

    // }

    //not logged in
    if(!user || !user.value){
        redirect("/login");
    }
    try{
        const parsed= JSON.parse(user.value);
        if(!parsed.id){
            redirect("/login");
        }
    }catch{
        redirect("/login");
    }

    return (
            <div>
                <p>Dashboard</p>
                <LogoutButton/>

                {/* <button className="border" onClick={handleLogout}>Logout</button> */}
            </div>
            
    );
}