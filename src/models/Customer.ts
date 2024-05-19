import mongoose, { Schema, Document } from "mongoose";
import Nodemailer from "../lib/Nodemailer";
import EmailVerifyTemplate from "../templates/EmailVerifyTemplate";

const addressSchema = new Schema({
  label: {
    type: String,
    enum: {
      values: ["Work", "Home", "Partner"],
      message: "Label value should be Work, Home, Partner",
    },
  },
  city: {
    type: String,
  },
  area: {
    type: String,
  },
  house: {
    type: String,
  },
  road: {
    type: String,
  },
  block: {
    type: String,
  },
  description: {
    type: String,
  },
});

const customerSchema = new Schema(
  {
    name: String,
    email: { type: String, trim: true },
    // email: { type: String, trim: true, unique: true },
    password: { type: String },
    gender: { type: String },
    dob: { type: Date },
    mobile: {
      type: String,
      maxlength: 11,
      minlength: 11,
      trim: true,
      // unique: true,
      // required: [true, "Valid mobile number needed!"],
    },
    address: [addressSchema],
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

// customerSchema.pre("save", function () {
//   console.log(this.name);
// });

// Middlware to send mail after insert new record in database;
customerSchema.post("save", async function (user, next) {
  if (user.isModified("email")) {
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
  }
  next();
});

export default mongoose.model("Customer", customerSchema);
