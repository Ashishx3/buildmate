    import mongoose from "mongoose";
    import user from "./userModel" 

    const projectSchema = new mongoose.Schema({
        title: {
            type: String,   
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        languages: {
            type: [String],
            required: true,
        },
        sourceCode: {
            type: String,
            required: true,

        },
        liveLink: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",   // link to User model
            required: true
        }
    }, { timestamps: true });

    const Project = mongoose.models.projects || mongoose.model("projects", projectSchema);

    export default Project;
