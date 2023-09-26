import { Types } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
  internships: Types.ObjectId[];
}