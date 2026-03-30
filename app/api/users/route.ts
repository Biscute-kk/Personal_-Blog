import { NextResponse } from "next/server";
import {Pool} from "pg";
import bcrypt from "bcrypt";
const pool=new Pool ({
    connectionString: process.env.DATABASE_URL,
});

// Define expected request body type
type UserRequest = {
  name: string;
  email: string;
  password: string;
};


export async function POST (req:Request){
    //Get request body
    try{
        const {name,email,password}:UserRequest=await req.json();
    
    //Validation
    if (!name || !email || !password){
        return NextResponse.json(
            {
                error:"All fields are required",
                status:400
            }
        );
    }
        // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //Insert into database
    const result = await pool.query(
        `INSERT INTO users (name,email,password)
        VALUES ($1,$2,$3)
        RETURNING id,email,name`,
        [name,email,hashedPassword]
    );
    //Success response
    return NextResponse.json(result.rows[0],{status:201});
}catch(err:any){
    if (err.code==="23505"){
        return NextResponse.json(
            {error:"Email already exists"},
           { status:400}
        );
    }else {
        return NextResponse.json(
            {error:"something went wrong"},
            {status:500}
        );
    }
}

}