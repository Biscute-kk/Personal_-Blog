"use client";

// import { useState,useEffect } from "react";
// import { useRouter } from "next/navigation";
import LogoutButton from "./logout";

export type Blog = {
    id: string,
    topic: string,
    content:string,
    status:string,
    created_at:string
}

interface DashboardUIProps{
    blogs: Blog[],

    topic:string,
    setTopic: (val:string)=>void,

    content: string,
    setContent: (val:string)=> void,
    
    editTopic: string,
    setEditTopic:(val:string)=>void,
    editContent:string,
    setEditContent: (val:string)=>void,
    editingId: string,
    setEditingId:(val:string)=>void,

    onSubmit:(e : React.SyntheticEvent)=>void,
    onDelete: (id:string)=>void,
    onUpdate:()=> void,
    onPublish: (blog:Blog)=>void,
    onStartEdit: (blog:Blog)=>void


}
export default function DashboardUI(
{    blogs,
  topic, setTopic, content, setContent,
  editTopic, setEditTopic, editContent, setEditContent,
  editingId, setEditingId,
  onSubmit, onDelete, onUpdate, onPublish, onStartEdit} : DashboardUIProps

){
    return(
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Workshop</h1>
                        <p className="text-slate-500">Draft, edit, and publish your stories.</p>
                    </div>               
                    <LogoutButton/>
                </header>

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* sidebar create form */}
                    <aside className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 sticky top-8">
                            <h2 className="text-lg font-bold mb-4 text-slate-800">New Story</h2>
                            <form onSubmit={onSubmit} className="space-y-4">
                                <input
                                type="text"
                                placeholder="Topic"
                                value={topic}
                                onChange={(e)=>setTopic(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                required
                                />
                                <textarea
                            
                                placeholder="Start Writing"
                                rows={6}
                                value={content}
                                onChange={(e)=>setContent(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                required
                                />
                                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                                    Create Draft
                                </button>
                            </form>
                        </div>
                    </aside>
                    {/* main content blog list */}

                    <main className="lg:col-span-2 space-y-6">
                        {blogs.length===0?(
                            <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
                                No stories found. Time to write!
                            </div>
                        ) : (
                            blogs.map((item)=>(
                                <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    {editingId===item.id?(
                                        <div className="space-y-4">
                                            <input
                                            className="w-full text-xl font-bold border-b-2 border-indigo-100 focus:border-indigo-500 outline-none pb-1"
                                            value={editTopic}
                                            onChange={(e)=> setEditTopic(e.target.value)}
                                            />
                                            <textarea
                                            className="w-full text-slate-600 outline-none min-h-[120px] leading-relaxed"
                                            value={editContent}
                                            onChange={(e)=> setEditContent(e.target.value)}
                                            />
                                            <div className="flex justify-between items-start mb-3">
                                                <button onClick={onUpdate} className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-bold">Update</button>
                                                <button onClick={()=>setEditingId("")} className="bg-slate-100 text-slate-600 px-5 py-2 rounded-lg text-sm font-bold">Cancel</button>
                                            </div>
                                        </div>
                                    ):(
                                        /* VIEW MODE */
                                        <div >
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-xl font-bold text-slate-800 leading-tight">{item.topic}</h3>
                                                <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest ${
                                                                    item.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                                    }`}>
                                                                {item.status || 'Draft'}
                                                </span>

                                            </div>
                                            <p className="text-slate-600 text-sm line-clamp-3 mb-6 leading-relaxed">{item.content}</p>
                                            <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                                                <span className="text-xs font-medium text-slate-400">
                                                    {new Date(item.created_at).toLocaleDateString()}
                                                </span>
                                                <div className="flex gap-4">
                                                    <button onClick={()=>onStartEdit(item)} className="text-slate-400 hover:text-indigo-600 text-sm font-bold transition-colors">Edit</button>
                                                    {item.status !== "published" && (
                                                        <button onClick={()=> onPublish(item)} className="text-emerald-600 hover:underline text-sm font-bold">Publish</button>
                                                    )}
                                                    <button onClick={()=> onDelete(item.id) } className="text-rose-400 hover:text-rose-600 text-sm font-bold transition-colors">Delete</button>
                                                </div>
                                            </div>

                                        </div>   
                                    // )
                                    )}
                                </div>
                            ))
                        )

                    }
                    </main>
                </div>                
            </div>
        </div>

    );

}




