import { Schema, Types, model } from 'mongoose';
import { IApplication } from '../../types';

const applicationSchema = new Schema<IApplication>({
  internshipId: {
    type: Schema.Types.ObjectId,
    ref: 'Internship',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  applicantName: {
    type: String,
    required: true,
  },
});

export const ApplicationModel = model<IApplication>(
  'Application',
  applicationSchema
);
