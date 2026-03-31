import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
type Blog= {
    id:string,
    topic:string,
    content:string,
    created_at:string
};

export default async function Dashboard(){
    const cookieStore = await cookies();
    const user = cookieStore.get("user");

    if (!user || !user.value){
        redirect("/login");
    }
    return (
            <div style={{ padding: "20px" }}>

                <DashboardClient/>


            </div>
            
    );
}