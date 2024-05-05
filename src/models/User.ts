import mongoose, { Schema, Document } from "mongoose";
import Nodemailer from "../lib/Nodemailer";
import EmailVerifyTemplate from "../templates/EmailVerifyTemplate";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    password: { type: String, required: true },
    verifyCode: { type: Number, maxLength: 6 },
    isVerified: { type: Boolean, default: false },
  },
  {
    // Static method are for model instance
    statics: {
      returnByName(name) {
        return this;
      },
    },
    // Following methods are for document instance
    methods: {
      printName() {
        console.log("hello methods user", this);
      },
    },
    timestamps: true,
    versionKey: false,
  }
);

// Pre hook are used for before  insert new record in database.

// userSchema.pre("save", function () {
//   console.log(this.name);
// });

// Middlware to send mail after insert new record in database;
userSchema.post("save", async function (user, next) {
  const emailVerifyTemplate = EmailVerifyTemplate(user.name, user.verifyCode);
  const sendMail: any = await Nodemailer.sendMail(
    user.email,
    "verify email shohan",
    emailVerifyTemplate
  );

  if (sendMail.messageId) {
    next();
  } else {
    const err = Error("Message not sent");
    next(err);
  }
});

export default mongoose.model("User", userSchema);
