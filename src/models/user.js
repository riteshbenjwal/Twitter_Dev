import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  if (!user.isModified("password")) return next();
  user.password = bcrypt.hashSync(user.password, SALT);
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.genJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    "twitter_secret",
    {
      expiresIn: "1h",
    }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
