import mongoose, { Schema, model } from 'mongoose';
import { IInternship } from '../../../types';

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
