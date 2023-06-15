import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

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
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password should be at least 6 characters'],
  },
});

companySchema.pre('save', async function (next) {
  // Hash password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

companySchema.statics.login = async function (email, password) {
  const company = await this.findOne({ email });
  if (!company) {
    throw Error('Incorrect email');
  }
  const auth = await bcrypt.compare(password, company.password);
  if (auth) {
    return company;
  }
  throw Error('Incorrect password');
};

export default mongoose.model('company', companySchema);
