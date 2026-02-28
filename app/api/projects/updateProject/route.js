export async function PUT(request) {
  try {
    const userId = getDataFromToken(request);
    const data = await request.formData();

    const updateFields = {
      title: data.get("title"),
      description: data.get("description"),
      languages: JSON.parse(data.get("languages")),
      sourceCode: data.get("sourceCode"),
      liveLink: data.get("liveLink"),
    };

    if (data.get("image")) {
      updateFields.image = data.get("image");
    }

    const project = await Project.findOneAndUpdate(
      { _id: data.get("projectId"), user: userId },
      updateFields,
      { new: true }
    );

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
