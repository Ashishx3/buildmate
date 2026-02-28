import Project from "@/models/projectModel";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const userId = getDataFromToken(request);

    const projects = await Project.find({ user: userId })
      .populate("user", "username")   // ⭐⭐⭐ VERY IMPORTANT
      .lean();

    return NextResponse.json(projects);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
