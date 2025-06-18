import mongoose from 'mongoose';
import { type } from 'os';

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String

    },
    categoryDescription: {
        type: String
    }

});

const category = mongoose.model('category', categorySchema)
export default category;