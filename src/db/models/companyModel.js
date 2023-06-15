import mongoose from 'mongoose';
import validator from 'validator';

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please enter your company name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your company email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password should be at least 6 characters'],
  },
});

export default mongoose.model('company', companySchema);
