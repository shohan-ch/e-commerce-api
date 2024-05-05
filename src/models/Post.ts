import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    is_published: {
      type: Boolean,
      required: true,
      default: false,
    },
    text: {
      type: String,
      required: [true, "Text field is neeeded!"],
    },
    image: {
      type: String,
      required: [true, "Image field is neeeded!"],
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("Post", postSchema);
