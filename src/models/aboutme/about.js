import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
  },
  designation: {
    type: String,
    // required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
});
const about = mongoose.model("about", aboutSchema);
export default about;