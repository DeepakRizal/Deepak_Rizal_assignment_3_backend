import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Simple validation for 10 digit number
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  website: {
    type: String,
    required: [true, "Please provide your website URL"],
    validate: [validator.isURL, "Please provide a valid URL"],
  },
  address: {
    street: {
      type: String,
      required: [true, "Street address is required"],
    },
    suite: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    zipcode: {
      type: String,
      required: [true, "Zipcode is required"],
      validate: {
        validator: function (v) {
          return /\d{5}(-\d{4})?/.test(v); // Simple validation for 5 or 9 digit zipcode
        },
        message: (props) => `${props.value} is not a valid zipcode!`,
      },
    },
  },
  company: {
    name: {
      type: String,
      required: [true, "Company name is required"],
    },
  },
  avatar: {
    type: String,
    default:
      "https://avatars.dicebear.com/v2/avataaars/Bret.svg?options[mood][]=happy",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
