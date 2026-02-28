
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Project from "@/models/projectModel";
import { connect } from "@/dbConfig/dbConfig";
import cloudinary from "@/lib/cloudinary";

connect();



export async function POST(request) {
  try {
    const userId = getDataFromToken(request);
    const data = await request.formData();

    
const image = data.get("image");

let imageUrl = "";

if (image && image.size > 0) {
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "projects" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(buffer);
  });

  imageUrl = uploadResult.secure_url;
}
    const project = await Project.create({
      title: data.get("title"),
      description: data.get("description"),
      languages: JSON.parse(data.get("languages")),
      sourceCode: data.get("sourceCode"),
      liveLink: data.get("liveLink"),
      image: imageUrl,
      user: userId,
    });

    return NextResponse.json({ message: "Project created", project });
  } catch (error) {
    console.log(error); // so you SEE errors next time
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
