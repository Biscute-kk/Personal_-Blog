import { Pool } from "pg";
import Link from "next/link";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function Page() {
  const result = await pool.query(
    `SELECT a.id, a.topic, a.content, a.created_at, b.name
     FROM blogs a
     JOIN users b ON a.user_id = b.id
     WHERE a.status = 'published'
     ORDER BY a.created_at DESC`
  );

  const blogs = result.rows;

//   return (
//     <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      
//       {/* 🧠 HERO */}
//       <div className="text-center py-12">
//         <h1 className="text-5xl font-bold mb-4">✍️ Stories & Ideas</h1>
//         <p className="text-gray-600 text-lg">
//           Discover thoughts from amazing writers
//         </p>
//       </div>

//       {/* 📚 BLOG GRID */}
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
//         {blogs.map((blog: any) => {
//           const preview =
//             blog.content.length > 140
//               ? blog.content.slice(0, 140) + "..."
//               : blog.content;

//           return (
//             <Link key={blog.id} href={`/blog/${blog.id}`}>
//               <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
                
//                 {/* 🏷 Title */}
//                 <h2 className="text-xl font-semibold mb-2 line-clamp-2">
//                   {blog.topic}
//                 </h2>

//                 {/* 👤 Author */}
//                 <p className="text-sm text-gray-500 mb-3">
//                   ✍️ {blog.name}
//                 </p>

//                 {/* 📄 Preview */}
//                 <p className="text-gray-700 text-sm mb-4 line-clamp-3">
//                   {preview}
//                 </p>

//                 {/* ⏱ Date */}
//                 <div className="text-xs text-gray-400">
//                   {new Date(blog.created_at).toLocaleDateString()}
//                 </div>

//               </div>
//             </Link>
//           );
//         })}
//       </div>
//       <div>
//         <Link className="border" href={`/login`}>Login</Link>
//         <Link className="border" href={`/register`} >Sign up</Link>
//       </div>
//     </div>
//   );
// }

return (
  <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
    {/* 🧭 NAVIGATION BAR */}
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          Inkwell.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm">
            Get Started
          </Link>
        </div>
      </div>
    </nav>

    {/* 🧠 HERO SECTION */}
    <header className="relative overflow-hidden py-20 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Stories & <span className="text-indigo-600">Ideas.</span>
        </h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto leading-relaxed">
          A place to read, write, and deepen your understanding of the world through the eyes of amazing writers.
        </p>
      </div>
      {/* Subtle decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
    </header>

    {/* 📚 BLOG GRID */}
    <main className="max-w-6xl mx-auto py-16 px-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog: any) => {
          const preview =
            blog.content.length > 140
              ? blog.content.slice(0, 140) + "..."
              : blog.content;

          return (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="group">
              <article className="flex flex-col h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:border-indigo-100 transition-all duration-300 transform group-hover:-translate-y-2">
                
                {/* 🏷 Topic Tag (Optional aesthetic touch) */}
                <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-500 mb-4 px-2 py-1 bg-indigo-50 w-fit rounded">
                  Article
                </span>

                {/* 👤 Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {blog.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{blog.name}</span>
                </div>

                {/* 📄 Title */}
                <h2 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                  {blog.topic}
                </h2>

                {/* 📝 Preview */}
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {preview}
                </p>

                {/* ⏱ Footer */}
                <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-medium">
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Read More →
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </main>

    {/* 👣 FOOTER */}
    <footer className="py-12 border-t border-slate-200 text-center">
      <p className="text-slate-400 text-sm">© 2026 Inkwell Media. All rights reserved.</p>
    </footer>
  </div>
);
}