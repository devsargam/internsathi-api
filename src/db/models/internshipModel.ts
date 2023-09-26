import mongoose, { Schema, model } from 'mongoose';

interface IInternship {
  title: string;
  company: string;
  salary: string;
  position: string;
  qualification: string;
  deadline: Date;
  status: 'open' | 'closed';
  department: string;
  createdBy: Schema.Types.ObjectId;
}

const internshipSchema = new mongoose.Schema<IInternship>({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['open', 'closed'],
    default: 'open',
  },
  department: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const InternshipModel = model<IInternship>(
  'Internship',
  internshipSchema
);
