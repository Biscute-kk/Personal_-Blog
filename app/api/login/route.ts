import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool=new Pool({
    connectionString:process.env.DATABASE_URL,
});

type LoginRequest={
    email:string;
    password:string;
};

export async function POST(res:Request){
    try{
        const {email,password}:LoginRequest= await res.json();
        
        if(!email || !password){
            return NextResponse.json(
                {err:"Email and Password required"},
                {status:400}
            )
        }

        const result=await pool.query(
            `SELECT *FROM users WHERE email=$1`,
            [email]
        );
        const user=result.rows[0];

        //compare password
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
           return NextResponse.json(
                {err:"Invalid Email or Password"},
                {status:401},
            );
        }
         // Success (for now just return user)

         const response = NextResponse.json({message:"Login success"});

         response.cookies.set("user",JSON.stringify({
            id:user.id,
            email:user.email,
         }),{
            httpOnly:true,
            path:"/"
         });
         return response;
        //  return NextResponse.json(
        //     {
        //         message: "Login successful ✅",
        //         user:{
        //             id:user.id,
        //             name:user.name,
        //             email:user.email,
        //         },
        //     },
        //     {status:200}
        //  );
    }catch(err:any){
        return NextResponse.json(
            {status:"something went wrong"},
            {status:500}
        );
    }
}