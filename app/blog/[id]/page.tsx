import { Pool } from "pg";
import { notFound } from "next/navigation";
import Link from "next/link";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default async function BlogPage({ params }: any) {
    const {id}=await params
  const result = await pool.query(
    `SELECT a.topic, a.content, a.created_at, b.name
     FROM blogs a
     JOIN users b ON a.user_id = b.id
     WHERE a.id = $1 AND a.status = 'published'`,
    [id]
  );

  if (result.rows.length === 0) return notFound();

  const blog = result.rows[0];

return (
  <div className="bg-white min-h-screen">
    <nav className="max-w-4xl mx-auto px-6 py-8">
      <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-2 transition-all">
        ← Back to all stories
      </Link>
    </nav>

    <article className="max-w-3xl mx-auto px-6 pb-24">

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
        {blog.topic}
      </h1>


      <div className="flex items-center gap-4 mb-12 py-6 border-y border-slate-100">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
          {blog.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900 text-lg leading-tight">
            {blog.name}
          </span>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <time dateTime={blog.created_at}>
              {new Date(blog.created_at).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </time>
            <span>•</span>
            <span>{Math.ceil(blog.content.length / 1000)} min read</span>
          </div>
        </div>
      </div>


      <div className="prose prose-lg prose-slate max-w-none">
        <div className="text-slate-700 leading-[1.8] whitespace-pre-line text-xl font-serif">
          {blog.content}
        </div>
      </div>

    </article>
  </div>
);
}