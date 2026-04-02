
import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool= new Pool({
    connectionString:process.env.DATABASE_URL,
});


export  async function GET(){

    const result= await pool.query(
        `SELECT topic, content, created_at
        FROM blogs 
        WHERE status=$1
        ORDER BY created_at DESC
        RETURNING topic,content,created_at,user_id`,['published']
    )

    return NextResponse.json(result.rows);

}