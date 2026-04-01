
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Pool } from "pg";


const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
})

export async function GET() {
    const cookieStore= await cookies();
    const userCookie= cookieStore.get("user");

    if (!userCookie || !userCookie.value){
        return NextResponse.json({error:"unauthorized"},{status:401});
    }
    let user;

    try {
        user= JSON.parse(userCookie.value);
        if(!user.id){
            return NextResponse.json({ error: "Invalid user" }, { status: 401 });
        }
    }catch{
        return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }


    const result=await pool.query(
            `SELECT id, topic, content, created_at
            FROM blogs
            WHERE user_id = $1
            ORDER BY created_at DESC`
            ,[user.id]
    );
    return NextResponse.json(result.rows);
}

export async function POST(req:Request){
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");

    if (!userCookie || !userCookie.value) {
        return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
        );
    }

    let user;

    try {
        user = JSON.parse(userCookie.value);

        if (!user.id) {
        return NextResponse.json(
            { error: "Invalid user" },
            { status: 401 }
        );
        }
    } catch {
        return NextResponse.json(
        { error: "Invalid user" },
        { status: 401 }
        );
    }
    const {topic,content}= await req.json();

    if (!topic || !content){
        return NextResponse.json(
            { error: "All fields required" },
            { status: 400 }
    );
    }
    const result= await pool.query(
        `INSERT INTO blogs (topic,content,user_id)
        values($1,$2,$3)
        RETURNING id,topic,content,created_at`,
        [topic,content,user.id]
    );
    return NextResponse.json(result.rows[0], { status: 201 });

}

export async function PUT (req:Request){
    const cookieStore= await cookies();
    const userCookie= cookieStore.get("user");

    if (!userCookie || !userCookie.value){
        return NextResponse.json({error:"not authorized"},{status:401});
    }

    const user= JSON.parse(userCookie.value);

    const{id,topic,content}=await req.json();

    if (!id || !topic || !content){
        return NextResponse.json({error:"All fields are required"},{status:400});
    }

    const result = await pool.query(
        `UPDATE blogs 
        SET topic=$1, content=$2
        WHERE id=$3 AND user_id=$4
        RETURNING id,topic,content,created_at`,
        [topic,content,id,user.id]
    )

    return NextResponse.json(result.rows[0]);

}

export async function DELETE(req:Request){
    const cookieStore= await cookies();
    const userCookie= cookieStore.get("user");

    if (!userCookie?.value){
        return NextResponse.json({error:"unauthorized"},{status:401});
    }

    const user= JSON.parse(userCookie.value);

    const {id} = await req.json();

    if(!id){
        return NextResponse.json({error:"blog id required"},{status:400});
    }
    await pool.query(
        `DELETE FROM blogs WHERE id=$1 AND user_id=$2`,
        [id,user.id]
    )

    return NextResponse.json({message:"Deleted"});
}