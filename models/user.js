const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username cannot be empty"],
    unique: true,
    minLength: [3, "Username cannot be less than 3 characters"],
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty"],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id;
    delete returnObj._id;
    delete returnObj.__v;
    delete returnObj.passwordHash;
  },
});

module.exports = mongoose.model("User", userSchema);
