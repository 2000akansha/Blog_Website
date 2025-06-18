import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema({
    name: {
        type: String
    },
    categoryMasterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    description: {
        type: String
    },

    content: {
        type: String
    },
    attachment: {
        type: String
    },
    readingTime: {
        type: String
    }

}, { timestamps: true });

const blogCategory = mongoose.model('blogCategory', blogCategorySchema)
export default blogCategory;