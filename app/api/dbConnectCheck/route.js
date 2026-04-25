import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    await connect();

    if (mongoose.connection.readyState === 1) {
      return NextResponse.json({
        success: true,
        message: "MongoDB Connected Successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "MongoDB Not Connected",
      });
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Database Connection Failed",
      error: error.message,
    });
  }
}