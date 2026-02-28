import { connect } from "@/dbConfig/dbConfig";
import Project from "@/models/projectModel";
import { NextResponse } from "next/server";

connect();

export async function GET() {
  try {
    const projects = await Project.find()
      .populate("user", "username")   // ⭐ magic line
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
