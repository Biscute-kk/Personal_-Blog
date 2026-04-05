"use client";
import LogoutButton from "../components/logout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardUI , {Blog} from "../components/dashboardUI";

export default function DashboardClient() {
    //create blog
  const [blog, setBlog] = useState<Blog[]>([]);
  const router =useRouter();    
//for creating new post
  const [topic,setTopic]=useState("");
  const[content,setContent]=useState("");

  //edit blog
  const [editingId,setEditingId]=useState("");
  const [editTopic,setEditTopic]=useState("");
  const [editContent,setEditContent]=useState("");


//fetch all blogs
  useEffect(() => {
    const fetchBlogs= async ()=>{
        const res = await fetch("/api/blogs");

        if (!res.ok){
            router.replace("/login");
            return;
        }
        const data = await res.json();
        setBlog(data);
        
    }
    fetchBlogs();
  }, []);

//create new post
const handleSubmit = async (e:React.SyntheticEvent)=>{
    e.preventDefault();

    const res= await fetch("/api/blogs",{
        method:"POST",
        headers:{
            "Content_Type":"application/json",
        },
        body: JSON.stringify({topic,content}),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    }
    // ✅ Update UI instantly
    setBlog((prev) => [data, ...prev]);
    // clear form
    setTopic("");
    setContent("");
  };


  // DELETE
  const handleDelete= async (id:string)=>{
    await fetch ("/api/blogs",{
        method:"DELETE",
        body:JSON.stringify({id}),
    });
    setBlog((prev)=>prev.filter((b)=>b.id!==id));
  };

  //startedit
  const startEdit=(blog:Blog)=>{
    setEditingId(blog.id);
    setEditTopic(blog.topic);
    setEditContent(blog.content);
  };

  //save edit
  const handleUpdate= async ()=>{
    const res= await fetch("/api/blogs",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:editingId,topic:editTopic,content:editContent}) 
    });
    const updated= await res.json();

    setBlog((prev)=>
    prev.map((b)=>(b.id === editingId? updated :b)));

    setEditingId("");
    setEditTopic("");
    setEditContent("");
  };

  // publish
  const handlePublish= async (blog:Blog)=>{
    const res=await fetch("/api/blogs",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            id:blog.id,
            status:"published"
        }),
    });
    // const updated=await res.json();
    setBlog((prev)=>
    prev.map((b)=>(b.id === blog.id? {...b,status:"published"} :b)));
    
  }

  return (
    <DashboardUI 
    blogs={blog}
    topic={topic}
    setTopic={setTopic}
    content={content} setContent={setContent}
    editTopic={editTopic} setEditTopic={setEditTopic}
    editContent={editContent} setEditContent={setEditContent}
    editingId={editingId} setEditingId={setEditingId}
    onSubmit={handleSubmit}
    onDelete={handleDelete}
    onPublish={handlePublish}
    onStartEdit={startEdit}
    onUpdate={handleUpdate}
    />
  );

}
//   return (
//     <div style={{ padding: "20px" }}>
//                     <h1>Your Blogs 📝</h1>

//                     {/* form  */}
//                     <form onSubmit={handleSubmit}>
//                         <input
//                             type="text"
//                             value={topic}
//                             placeholder="topic"
//                             onChange={(e)=>setTopic(e.target.value)}
//                             required
//                         />
//                         <br/> <br/>
//                         <input
//                             type="text"
//                             value={content}
//                             placeholder="Content"
//                             onChange={(e)=>setContent(e.target.value)}
//                             required
//                         />
//                         <br/> <br/>
//                         <button type="submit">Add Blog</button>
//                     </form>

//                     {blog.length===0?(
//                         <p>NO BLOGS YET</p>
//                     ):(
//                         blog.map((blog)=>(
//                             <div key={blog.id} style={{marginBottom:'20px'}}>
//                                 {editingId===blog.id?(
//                                 <>
//                                     <input
//                                         value={topic}
//                                         onChange={(e)=>setTopic(e.target.value)}
//                                     />
//                                     <textarea
//                                         value={content}
//                                         onChange={(e)=>setContent(e.target.value)}
//                                     />
//                                     <button onClick={handleUpdate}>Submit</button>
//                                     <button onClick={()=>setEditingId("")}>cancel</button>

//                                 </>



//                                     ):(

//                                 <>
//                                     <h3>{blog.topic}</h3>
//                                     <p>{blog.content}</p>
//                                     <small>{new Date(blog.created_at).toLocaleString()}</small>
//                                     <button onClick={()=>startEdit(blog)}>Edit</button>
//                                     {blog.status !=="published" &&(
//                                        <button onClick={()=>handlePublish(blog)}>Publish</button> 
//                                     )}
                                    
//                                     {/* {blog.status==="draft"?<button onClick={handlePublish}>Publish</button>:} */}
//                                     {/* <button onClick={handlePublish}>Publish</button> */}
//                                     <button onClick={()=>handleDelete(blog.id)}>Delete</button>
//                                 </>
//                             )}
//                             </div>
//                         ))


//                     )}

//                     <LogoutButton/>
    
    
//                 </div>
//   );
