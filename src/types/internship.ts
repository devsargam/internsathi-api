import { Types } from 'mongoose';

export interface IInternship {
  title: string;
  company: string;
  salary: string;
  position: string;
  qualification: string;
  deadline: Date;
  status: 'open' | 'closed';
  department: string;
  createdBy: Types.ObjectId;
}
