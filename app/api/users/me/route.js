import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {

  

  
  try {

    
    const userId = getDataFromToken(request);
  
    
    const user = await User.findById(userId).select("username email");
  
    
    return NextResponse.json(user);

  } 
  
  catch (err) {
    
    return NextResponse.json(null, { status: 401 });
  
  }
}
