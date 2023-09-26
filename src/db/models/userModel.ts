import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter your username'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [6, 'Password should be at least 6 characters'],
  },
  role: {
    type: String,
    default: 'user',
    validate: {
      validator: (role: string) => role === 'user' || role === 'company',
      message: 'Role should be either user or company',
    },
  },
  internships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Internship',
    },
  ],
});

userSchema.pre('save', async function (next) {
  // Hash password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
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

export const UserModel = mongoose.model('User', userSchema);
