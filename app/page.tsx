// "use client"
// import { useEffect, useState } from "react";
import { Pool } from "pg";

const pool=new Pool({
  connectionString:process.env.DATABASE_URL,
})
type Blog= {
    id:string,
    topic:string,
    content:string,
    created_at:string,
    status:string
};
export default async function Page(){

  // const [blog,setBlog]=useState<Blog[]>([])
  
    // useEffect(() => {
    // const fetchBlogs= async ()=>{
    //     const res = await fetch("/api/dashboard");
    //     const data = await res.json();
    //     setBlog(data);
        
    // }
    // fetchBlogs();
  // }, []);
  // export default async function Home() {
  const result = await pool.query(
    `SELECT topic, content, created_at
     FROM blogs
     WHERE status = 'published'
     ORDER BY created_at DESC`
  );

  const blog = result.rows;



  return (
<div style={{ padding: "20px" }}>
                    <h1>NEW Blogs 📝</h1>

                    {blog.length===0?(
                        <p>NO BLOGS YET!!</p>
                    ):(
                        blog.map((blog:any,i:number)=>(
                            <div key={i} style={{marginBottom:'20px'}}>
                                <>
                                    <h3>{blog.topic}</h3>
                                    <p>{blog.content}</p>
                                    <small>{new Date(blog.created_at).toLocaleString()}</small>                             
                                </>                     
                            </div>
                        ))
                    )}
 
                </div>
  );

  // );
}
