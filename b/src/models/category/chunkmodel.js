import mongoose from "mongoose";
const blogChunkSchema = new mongoose.Schema({
    uploadId: { type: String, required: true, index: true },
    chunkIndex: { type: Number, required: true },
    totalChunks: { type: Number, required: true },
    name: String,
    categoryMasterId: String,
    description: String,
    content: String,
    createdAt: { type: Date, default: Date.now, expires: 3600 } // auto-delete after 1 hour
});
export default mongoose.model("BlogChunk", blogChunkSchema);