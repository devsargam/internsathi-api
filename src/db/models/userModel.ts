import { Model, Schema, Types, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { IUser } from '../../types';

interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, IUserModel>({
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
      validator: (role: string) =>
        role === 'user' || role === 'company',
      message: 'Role should be either user or company',
    },
  },
  internships: [
    {
      type: Schema.Types.ObjectId,
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

userSchema.statics.login = async function (
  email: string,
  password: string
) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error('Incorrect email');
  }
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw new Error('Incorrect password');
  }
  return user;
};

export const UserModel = model<IUser, IUserModel>('User', userSchema);
