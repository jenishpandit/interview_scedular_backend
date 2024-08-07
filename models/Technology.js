import mongoose from "mongoose";

// creating mongoose schema for technologies
const technologySchema = new mongoose.Schema(
    {
        technology_name: {
            type: String,
            required: true,
            unique: true
        }
    }
);

technologySchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.__v
    }   
})

const Technology = mongoose.model("Technology", technologySchema);
export default Technology;
